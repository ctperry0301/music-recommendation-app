import { useEffect, useState } from 'react';
import { ListGroup, Container, Row, Col } from 'react-bootstrap'; 
import './App.css';

function SongComponent(props) {
  let recommendMoreSongs = (song) => {
    console.log("Recommending: ", song);
  }

  return (
    <div>
          <h3>Recommending songs similar to: {props.currentSong}</h3>
          {props.songRecs ? 
            <ListGroup className="list-group">
              <Container style={{border: '1px solid white', width: '100%'}}> 
                    <Row>
                      <Col>
                        <h3>Song Name</h3>
                        </Col>
                      <Col>
                        <h3>Artist </h3>
                      </Col>
                      <Col>
                        <h3>Score </h3>
                      </Col>
                    </Row>
                  </Container>
              {props.songRecs.map((obj, index) => 
              <div>                        
                <ListGroup.Item action>
                  <Container onClick={() => {
                    console.log(`You clicked on ${obj.song}`);
                    props.setCurrentSong(obj.song);
                    props.setSongRecs('');
                    recommendMoreSongs(obj.song);
                  }}>
                    <Row>
                      <Col>{obj.song} </Col>
                      <Col>{obj.artist} </Col>
                      <Col>{obj.score} </Col>
                    </Row>

                  </Container>
                </ListGroup.Item>
                </div>
              )}

            </ListGroup>
           : <div>Loading... </div>}</div>
  )
}

export default SongComponent;