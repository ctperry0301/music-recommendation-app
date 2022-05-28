import { useEffect, useState } from 'react';
import './App.css';
import SongComponent from './SongComponent';
import { songList } from './songs3';

function App() {
  const [songRecs, setSongRecs] = useState();
  const [tempVal, setTempVal] = useState();
  const [currentSong, setCurrentSong] = useState('');
 


  useEffect(() => {
    var list = document.getElementById('songOptions');
    songList.sort().forEach(function(item){
      var option = document.createElement('option');
      option.value = item;
      list.appendChild(option);
    });
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
        <div className="set-width">
          
          <h3> Please Choose a song! </h3>
          <input 
            className="selector" 
            list="songOptions"
            value={tempVal} 
            onChange={(e) => setTempVal(e.target.value)}
          />
          <button onClick={() => setCurrentSong(tempVal)}>Search</button>
          <datalist id="songOptions">
            <option value="You Only Live Once" />
            <option value="Silent Shout" />
            <option value="Skin And Bones" />
            <option value="Needy Girl" />
            <option value="Year 3000" />
          </datalist>  
        </div>
        {currentSong ?
          <SongComponent currentSong={currentSong} setCurrentSong={setCurrentSong} songRecs={songRecs} setSongRecs={setSongRecs}/>
          : (null)
        }
      </header>
    </div>
  );
}

export default App;
