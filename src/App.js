import React, { useState, useEffect }  from "react";

import "./App.css";
import "monday-ui-react-core/dist/main.css"

import mondaySdk from "monday-sdk-js";
import Container from 'react-bootstrap/Container'
import MainContentContainer from "./containers/MainContentContainer";
import TraineeBoardSelectionContainer from './containers/TraineeBoardSelectionContainer'
import Row from 'react-bootstrap/Row'

const monday = mondaySdk();
const [SELECT, TRAINEE, TRAINER] = ['select', 'trainee', 'trainer']

monday.setToken(process.env.REACT_APP_MONDAY_TOKEN);

const App = () => {

    const [boardId, setCurrentBoardId] = useState(null)
    const [viewerStatus, setViewerStatus] = useState('')

    useEffect(() => {
        monday.listen('settings', res => {
            setViewerStatus(res.data.userStatus)
             if (res.data.userStatus === TRAINER && !res.data.boardId) {
                 monday
                     .get('context')
                     .then((res) => setCurrentBoardId(res.data.boardId))
             } else {
                 setCurrentBoardId(null)
             }
        })
    }, [])

    return (
        <Container fluid="xl">
            <Row>
                {boardId && viewerStatus !== SELECT && (
                    <MainContentContainer
                        boardId={boardId}
                        monday={monday}
                        isViewerAdmin={viewerStatus === TRAINER}
                    />
                )}
                {viewerStatus === TRAINEE && boardId === null && (
                    <TraineeBoardSelectionContainer
                        setCurrentBoardId={setCurrentBoardId}
                        monday={monday}
                    />
                )}
                {viewerStatus === TRAINER && 'Select Window'}
            </Row>
        </Container>
    )
}
  

export default App;
