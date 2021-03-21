import React, { useState, useEffect } from "react";
import mondaySdk from "monday-sdk-js";
import "./App.css";
import "monday-ui-react-core/dist/main.css"
// import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"
import MainContainer from "./containers/MainContainer";
import ProgressContainer from "./containers/ProgressContainer";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const monday = mondaySdk();

const App = () => {
  const [inputValue, setInputValue] = useState("1147743039");
  const [board, setBoardData] = useState({});

  useEffect(() => {
    monday.setToken(process.env.REACT_APP_MONDAY_TOKEN);
  }, []);

  const fetchTrainingBoard = () => {
    monday
      .api(
        `query ($boardIds: [Int]) { 
          boards (ids:$boardIds) { 
            items { 
              name column_values { 
                title text 
              } 
              group { 
                title 
              } 
            }
          } 
        }`,
        { variables: { boardIds: parseInt(inputValue, 10) } }
      )
      .then((response) => {
        console.log(response.data)
        setBoardData(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Container fluid>
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Row>
        <MainContainer monday={monday} />
        <button onClick={fetchTrainingBoard}>Get Training Board</button>
      </Row>
      <Row>
        <ProgressContainer monday={monday} />
      </Row>
    </Container>
  );
}

export default App;
