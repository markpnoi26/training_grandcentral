import React, { useState, useEffect }  from "react";

import "./App.css";
import "monday-ui-react-core/dist/main.css"

import mondaySdk from "monday-sdk-js";
import Container from 'react-bootstrap/Container'
import MainContentContainer from "./containers/MainContentContainer";
import Row from 'react-bootstrap/Row'

const monday = mondaySdk();

monday.setToken(process.env.REACT_APP_MONDAY_TOKEN);

const App = () => {

    const [boardId, setCurrentBoardId] = useState(null)

    useEffect(() => {
        monday.listen('settings', res => {
            if (res.data.userStatus === 'trainer') {
                monday.get('context').then( res => setCurrentBoardId(res.data.boardId))
            } else {
                setCurrentBoardId(parseInt(res.data.boardId, 10))
            }
        })
    }, [])

    return (
        <Container fluid>
            <Row>
                {boardId && (
                    <MainContentContainer
                        boardId={boardId}
                        monday={monday}
                    />
                )}
            </Row>
        </Container>
    )
}
  

export default App;
