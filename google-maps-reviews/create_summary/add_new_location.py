import os
import openai
import pandas as pd
from google.cloud import firestore
from google.oauth2 import service_account
from openai import OpenAI

# Load environment variables from .env
from dotenv import load_dotenv
load_dotenv()

# Initialize Firestore
credentials = service_account.Credentials.from_service_account_file('/Users/hugo/Downloads/ratetheclub-firebase-adminsdk-y19bq-95f118892a.json')
db = firestore.Client(credentials=credentials)

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to generate a summary using OpenAI's GPT
def generate_summary(venue_name, reviews):
    prompt = f"Summarize the following reviews for the venue '{venue_name}':\n"
    review_text = "\n".join([f"- {review}" for review in reviews])
    prompt += review_text + "\nGenerate a concise summary of these reviews."

    try:
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
            {"role": "system", "content": prompt}
            ]
        )
        
        summary = completion.choices[0].message.content
        return summary
    except Exception as e:
        print(f"Error generating summary for venue '{venue_name}': {e}")
        return None

# Function to query Firestore and retrieve the venue_id based on venue_name
def get_venue_id_by_name(venue_name):
    try:
        venue_ref = db.collection('venues').where('name', '==', venue_name).limit(1).stream()

        # Retrieve the first matching document (if any)
        for venue in venue_ref:
            print(f"Venue '{venue_name}' found with ID: {venue.id}")
            return venue.id  # Return the venue's Firestore document ID (venue_id)

        print(f"Venue '{venue_name}' not found in Firestore.")
        return None
    except Exception as e:
        print(f"Error querying venue '{venue_name}' from Firestore: {e}")
        return None

# Function to process new reviews and add them to Firestore
def add_new_reviews(csv_file):
    # Read the CSV file for new reviews
    df = pd.read_csv(csv_file)

    # Ensure the CSV contains the required columns
    if 'place_name' not in df.columns or 'review_text' not in df.columns or 'published_at_date' not in df.columns:
        raise ValueError("CSV must contain 'place_name', 'review_text', and 'published_at_date' columns.")

    # Group reviews by place_name, aggregate review_text and published_at_date as lists
    grouped_reviews = df.groupby('place_name').agg({
        'review_text': list,
        'published_at_date': list
    }).reset_index()

    # Add new reviews to the reviews collection under the venue
    for _, row in grouped_reviews.iterrows():
        venue_name = row['place_name']
        reviews = row['review_text']
        dates = row['published_at_date']

        # Dynamically query Firestore to get the venue_id using venue_name
        venue_id = get_venue_id_by_name(venue_name)

        if venue_id:
            print(f"Adding new reviews for venue '{venue_name}' (ID: {venue_id})...")

            # Add individual reviews to the `reviews` sub-collection under the existing venue
            for review_text, published_at_date in zip(reviews, dates):
                if not review_text:
                    continue
                review_id = f"{published_at_date}_{venue_id}"  # Prefix review document ID with date
                add_review_to_subcollection(venue_id, review_id, review_text, published_at_date)
        else:
            print(f"Venue '{venue_name}' not found. Skipping reviews.")

# Function to add new reviews to the reviews sub-collection
def add_review_to_subcollection(venue_id, review_id, review_text, published_at_date):
    try:
        # Check if the review already exists in Firestore
        review_ref = db.collection('venues').document(venue_id).collection('reviews').document(review_id).get()

        if review_ref.exists:
            print(f"Review '{review_id}' for venue '{venue_id}' already exists. Skipping.")
        else:
            # Add the new review to Firestore
            db.collection('venues').document(venue_id).collection('reviews').document(review_id).set({
                'review_text': review_text,
                'published_at_date': published_at_date,
            })
            print(f"New review '{review_id}' for venue '{venue_id}' added to Firestore.")
    except Exception as e:
        print(f"Error adding new review '{review_id}' for venue '{venue_id}' to Firestore: {e}")

# Main function to run the script
if __name__ == "__main__":
    # Path to the input CSV file for new reviews
    new_reviews_csv_file = 'new_venue_reviews.csv'  # Replace with your actual CSV file path for new reviews

    # Step 1: Add new reviews from CSV to existing venues (querying Firestore dynamically by venue name)
    add_new_reviews(new_reviews_csv_file)
