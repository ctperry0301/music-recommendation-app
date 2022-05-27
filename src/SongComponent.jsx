import { useEffect, useState } from 'react';
import { ListGroup, Container, Row, Col } from 'react-bootstrap'; 
import './App.css';

function SongComponent(props) {
  let recommendMoreSongs = (song) => {
    console.log("Recommending: ", song);
  }

  return (
    <div>
          {props.songRecs ? 
            <ListGroup className="list-group">
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
                      <Col>Song Name: {obj.song} </Col>
                      <Col>Score: {obj.score} </Col>
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