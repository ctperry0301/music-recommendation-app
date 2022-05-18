import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [time, setTime] = useState(0);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/time', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then(
      res => res.json()).then(data => {
          setTime(data.time)
        });
    console.log(time);
    // get data from backend and return it here and put in songRecs
  }, [])
  
  const [songRecs, setSongRecs] = useState(['']);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/songRecs', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then(
      res => res.json()).then(data => {
          setSongRecs(data.songRecs)
        });
    console.log(songRecs);
    // get data from backend and return it here and put in songRecs
  })
  
  return (
    <div className="App">
      <header className="App-header">

        <p>Song Recs: {songRecs}</p>
        <p>Time: {time}</p>

      </header>
    </div>
  );
}

export default App;
