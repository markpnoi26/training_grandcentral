import React, { useState }  from "react";

import "./App.css";
import "monday-ui-react-core/dist/main.css"

import mondaySdk from "monday-sdk-js";
import Container from 'react-bootstrap/Container'
import MainContentContainer from "./containers/MainContentContainer";
import SelectionContainer from "./containers/SelectionContainer"
import Row from 'react-bootstrap/Row'

const TRAINEE = 'trainee'
const TRAINER = 'trainer'

const monday = mondaySdk();

monday.setToken(process.env.REACT_APP_MONDAY_TOKEN);

const App = () => {

    const [currUserStatus, setCurrUserStatus] = useState('')
    const [isInSelection, setIsInSelection] = useState(true)

    return (
        <Container fluid>
            <Row>
                {currUserStatus === TRAINEE && (
                    <MainContentContainer
                        isUserOwner={false}
                        monday={monday}
                        setCurrUserStatus={setCurrUserStatus}
                        setIsInSelection={setIsInSelection}
                    />
                )}
                {currUserStatus === TRAINER && (
                    <MainContentContainer 
                        isUserOwner={true}
                        monday={monday}
                        setCurrUserStatus={setCurrUserStatus}
                        setIsInSelection={setIsInSelection} 
                    />
                )}
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
    );
}
  

export default App;

// import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"