import time
import pandas
import json
import Recommenders
from sklearn.model_selection import train_test_split
from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Step 1: Obtaining Data
data_file = 'http://millionsongdataset.com/sites/default/files/AdditionalFiles/unique_tracks.txt'

song_df_1 = pandas.read_table(data_file, delimiter='<SEP>', header = None, on_bad_lines='skip', engine='python')
song_df_1.columns = ['track_id', 'song_id', 'artist_name', 'song_title']
song_df_1 = song_df_1.drop('track_id', 1)

# Now just takingt the first 10,000 songs, following the article
song_df_1 = song_df_1.head(10000)

# Link to full dataset: http://millionsongdataset.com/tasteprofile/#desc
# song_df_2 = pandas.read_table('sample_triplets_data_1')
song_df_2 = pandas.read_table('Data/25mb_train_triplets.txt')
song_df_2.columns = ['user_id', 'song_id', 'listen_count']

song_df = pandas.merge(song_df_1, song_df_2, on="song_id", how="right")
song_df = song_df.dropna()

myDict = dict(zip(song_df.song_title, song_df.artist_name))

# Step 2: Data Transformation                 
song_grouped = song_df.groupby(['song_title']).agg({'listen_count': 'count'}).reset_index()
grouped_sum = song_grouped['listen_count'].sum()
song_grouped['percentage'] = song_grouped['listen_count'].div(grouped_sum)*100
sorted_songs = song_grouped.sort_values(['listen_count', 'song_title'], ascending = [0, 1])
# print(sorted_songs.head())

users = song_df['user_id'].unique()
train_data, test_data  = train_test_split(song_df, test_size = 0.20, random_state = 0)

pm = Recommenders.popularity_recommender_py()
pm.create(train_data, 'user_id', 'song_title')


@app.route('/')
def create_model():
  return '<p> Hello World </p>'

@app.route('/time')
def get_current_time():
  return {'time': time.time()}

@app.route('/songRecs/<currentSong>')
def get_song_recs(currentSong):
  print(" $ $ $ $ $ ")
  print(pm.get_similar_items([currentSong]).to_json())
  print(" $$ $  $$ $ ")
  return pm.get_similar_items([currentSong]).to_json()
