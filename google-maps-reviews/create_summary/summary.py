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
            model="gpt-4o",
            messages=[
            {"role": "system", "content": prompt}
            ]
        )
        
        summary = completion.choices[0].message.content
        return summary
    except Exception as e:
        print(f"Error generating summary for venue '{venue_name}': {e}")
        return None

# Function to process venues from csv1 and store them in Firestore, returning a mapping of venue_name -> document_id (venue_id)
def process_venues(csv_file):
    # Read the CSV file
    df = pd.read_csv(csv_file)

    # Ensure the CSV contains the required columns
    required_columns = ['name', 'main_category', 'address', 'link']
    if not all(column in df.columns for column in required_columns):
        raise ValueError(f"CSV must contain the following columns: {', '.join(required_columns)}")

    # Map to store venue_name -> document_id (venue_id)
    venue_mapping = {}

    # Add each venue to the venues collection in Firestore
    for _, row in df.iterrows():
        venue_data = {
            'name': row['name'],
            'category': row['main_category'],
            'address': row['address'],
            'link': row['link'],
        }
        print(f"Adding venue '{row['name']}' to Firestore...")

        # Save venue and get document_id (venue_id)
        venue_id = save_venue_to_firestore(venue_data)
        if venue_id:
            venue_mapping[row['name']] = venue_id

    return venue_mapping

# Function to save a venue to Firestore and return the document_id
def save_venue_to_firestore(venue_data):
    try:
        venue_ref = db.collection('venues').add(venue_data)
        venue_id = venue_ref[1].id  # Get the document_id (venue_id)
        print(f"Venue '{venue_data['name']}' added to Firestore with ID: {venue_id}")
        return venue_id
    except Exception as e:
        print(f"Error adding venue '{venue_data['name']}' to Firestore: {e}")
        return None

# Function to process reviews from csv2, generate a summary, and store reviews in Firestore, linking each review to the correct venue_id
def process_reviews(csv_file, venue_mapping):
    # Read the CSV file
    df = pd.read_csv(csv_file)

    # Ensure the CSV contains the required columns
    if 'place_name' not in df.columns or 'review_text' not in df.columns:
        raise ValueError("CSV must contain 'venue_name' and 'review_text' columns.")

    # Group reviews by venue_name
    grouped_reviews = df.groupby('place_name').agg({
    'review_text': list,
    'published_at_date': list
}).reset_index()


    # Add each review to the reviews collection in Firestore, associating it with a venue_id and generating summaries
    for _, row in grouped_reviews.iterrows():
        print(row)
        venue_name = row['place_name']
        reviews = row['review_text']
        dates = row['published_at_date']

        # Get venue_id from the mapping
        venue_id = venue_mapping.get(venue_name)

        if venue_id:
            print(f"Generating summary for venue '{venue_name}' (ID: {venue_id})...")
            # Generate the summary for the venue based on reviews
            summary = generate_summary(venue_name, reviews)

            if summary:
                # Save the summary to the venue document in the `venues` collection
                save_summary_to_venue(venue_id, summary)

            # Save individual reviews to the `reviews` collection
            for review, date in zip(reviews, dates):
                save_review_to_firestore(venue_id, review, date)
        else:
            print(f"Venue '{venue_name}' not found. Skipping reviews.")

# Function to save individual reviews to Firestore
def save_review_to_firestore(venue_id, review_text, date):
    try:
        db.collection('reviews').add({
            'venue_id': venue_id,
            'review_text': review_text, 
            'date' : date,
        })
        print(f"Review for venue '{venue_id}' added to Firestore.")
    except Exception as e:
        print(f"Error adding review for venue '{venue_id}' to Firestore: {e}")

# Function to save the summary to the venue in Firestore
def save_summary_to_venue(venue_id, summary):
    try:
        venue_ref = db.collection('venues').document(venue_id)
        venue_ref.update({'summary': summary})
        print(f"Summary for venue '{venue_id}' added to Firestore.")
    except Exception as e:
        print(f"Error adding summary for venue '{venue_id}' to Firestore: {e}")

# Main function to run the script
if __name__ == "__main__":
    # Path to the input CSV files
    venues_csv_file = 'venue_overview.csv'  # Replace with your actual CSV1 file path
    reviews_csv_file = 'venue_review.csv'  # Replace with your actual CSV2 file path

    # Step 1: Process venues from csv1 and get the venue_name -> document_id (venue_id) mapping
    venue_mapping = process_venues(venues_csv_file)

    # Step 2: Process reviews from csv2, associating each review with the correct venue_id and generating summaries
    process_reviews(reviews_csv_file, venue_mapping)
