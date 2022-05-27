import { useEffect, useState } from 'react';
import './App.css';
import SongComponent from './SongComponent';

function App() {
  const [songRecs, setSongRecs] = useState();
  const [currentSong, setCurrentSong] = useState('You Only Live Once');

  useEffect(() => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5000');
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(`http://127.0.0.1:5000/songRecs/${currentSong}`, {
      method: 'GET',
      headers: headers
    }).then(res => res.json()).then(data => {
          let songArr = [];
          for (let step = 0; step < 10; step++) {
            let songObj = { 
              song: data.song[step],
              score: data.score[step],
            }
            songArr.push(songObj)
          }
          console.log("pre-formatted data: ", data)
          setSongRecs(songArr)
        })
    // get data from backend and return it here and put in songRecs
  }, [currentSong])
  
  return (
    <div className="App">
      <header className="App-header">
        <h3>Recommending songs similar to: {currentSong}</h3>
        <SongComponent currentSong={currentSong} setCurrentSong={setCurrentSong} songRecs={songRecs} setSongRecs={setSongRecs}/>
      </header>
    </div>
  );
}

export default App;
