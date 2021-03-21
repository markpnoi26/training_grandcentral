import React, { useState }  from "react";

import "./App.css";
import "monday-ui-react-core/dist/main.css"

import mondaySdk from "monday-sdk-js";
import Container from 'react-bootstrap/Container'
import MainContentContainer from "./containers/MainContentContainer";
import SelectionContainer from "./containers/SelectionContainer"
import TrainingCreationContainer from "./containers/TrainingCreationContainer"
import Row from 'react-bootstrap/Row'

const TRAINEE = 'trainee'
const TRAINER = 'trainer'

const monday = mondaySdk();

monday.setToken(process.env.REACT_APP_MONDAY_TOKEN);

const MondaySDKContext = React.createContext(monday)

const App = () => {

  const [currUserStatus, setCurrUserStatus] = useState('')
  const [isInSelection, setIsInSelection] = useState(true)

  return (
        <MondaySDKContext.Provider value={monday}>
        <Container fluid>
            <Row>
            {currUserStatus === TRAINEE && <MainContentContainer />}
            {currUserStatus === TRAINER && <TrainingCreationContainer />}
            {isInSelection && (
                <SelectionContainer
                TRAINEE={TRAINEE}
                TRAINER={TRAINER}
                setCurrUserStatus={setCurrUserStatus}
                setIsInSelection={setIsInSelection}
                />
            )}
            </Row>
        </Container>
        </MondaySDKContext.Provider>
  );
}
  

export default App;

// import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"