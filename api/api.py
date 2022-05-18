import time
import pandas
import Recommenders
from sklearn.model_selection import train_test_split
from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def home():
  return '<p> Hello World </p>'

@app.route('/time')
def get_current_time():
  return {'time': time.time()}

@app.route('/songRecs')
def get_song_recs():
  data_file = 'http://millionsongdataset.com/sites/default/files/AdditionalFiles/unique_tracks.txt'
  song_df_1 = pandas.read_table(data_file, delimiter='<SEP>', header = None, on_bad_lines='skip', engine='python')
  song_df_1.columns = ['track_id', 'song_id', 'artist_name', 'song_title']
  song_df_1 = song_df_1.drop('track_id', 1)

  # Link to full dataset: http://millionsongdataset.com/tasteprofile/#desc
  # song_df_2 = pandas.read_table('sample_triplets_data_1')
  song_df_2 = pandas.read_table('Data/train_triplets.txt')
  song_df_2.columns = ['user_id', 'song_id', 'listen_count']

  song_df = pandas.merge(song_df_1, song_df_2, on="song_id", how="right")
  # song_df.drop_duplicates(['song_id'])
  # print(song_df.columns)
  print("\n #### MERGED DF #### \n")
  print(song_df.head())


  # Step 2: Data Transformation                 
  song_grouped = song_df.groupby(['song_id']).agg({'listen_count': 'count'}).reset_index()
  grouped_sum = song_grouped['listen_count'].sum()
  song_grouped['percentage'] = song_grouped['listen_count'].div(grouped_sum)*100
  sorted_songs = song_grouped.sort_values(['listen_count', 'song_id'], ascending = [0, 1])
  # print(sorted_songs.head())

  users = song_df['user_id'].unique()
  # print()
  # print(len(users))
  songs = song_df['song_title']
  # print(len(songs))

  train_data, test_data  = train_test_split(song_df, test_size = 0.25, random_state = 0)

  pm = Recommenders.popularity_recommender_py()
  pm.create(train_data, 'user_id','song_title')

  #user the popularity model to make some prediction
  # user_id = users[5]
  # songObj = pm.recommend(user_id)
  # print(songObj)

  pm.get_similar_items(['U Smile - Justin Bieber'])
  return pm.get_similar_items(['U Smile - Justin Bieber'])
