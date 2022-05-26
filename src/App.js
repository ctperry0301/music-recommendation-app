import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { ListGroup, Container, Row, Col } from 'react-bootstrap'; 
import './App.css';

function App() {
  const [songRecs, setSongRecs] = useState();
  const [currentSong, setCurrentSong] = useState('You Only Live Once');

  function alertClicked(song) {
    console.log(`You clicked on ${song}`);
  }

  useEffect(() => {
    console.log('post-formatted-data: ', songRecs)
  }, [songRecs])
  useEffect(() => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5000');
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS');

    fetch('http://127.0.0.1:5000/songRecs', {
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
        }).then(console.log(songRecs));
    // get data from backend and return it here and put in songRecs
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">

        <div>
          <h3 >Similar Songs to: {currentSong} </h3>
          {songRecs ? 
            <ListGroup className="list-group">
              {songRecs.map(obj => 
                <ListGroup.Item action onClick={alertClicked(obj.song)}>
                  <Container>
                    <Row>
                      <Col>Song Name: {obj.song} </Col>
                      <Col>Score: {obj.score} </Col>
                    </Row>

                  </Container>
                </ListGroup.Item>
              )}

            </ListGroup>
           : <div>Loading... </div>}</div>
      </header>
    </div>
  );
}

export default App;
