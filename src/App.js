import React, { useState, useEffect }  from "react";

import "./App.css";
import "monday-ui-react-core/dist/main.css"

import mondaySdk from "monday-sdk-js";
import Container from 'react-bootstrap/Container'
import MainContentContainer from "./containers/MainContentContainer";
import TraineeBoardSelectionContainer from './containers/TraineeBoardSelectionContainer'
import TutorialContainer from './containers/Tutorial'
import Row from 'react-bootstrap/Row'

const monday = mondaySdk();
const [SELECT, TRAINEE, TRAINER] = ['select', 'trainee', 'trainer']

monday.setToken(process.env.REACT_APP_MONDAY_TOKEN);

const App = () => {
    const [boardId, setCurrentBoardId] = useState(null)
    const [viewerStatus, setViewerStatus] = useState('')
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        monday.listen('settings', res => {
            setViewerStatus(res.data.userStatus)
            if (res.data.userStatus === TRAINER && !res.data.boardId) {
                setIsLoading(true)
                monday
                    .get('context')
                    .then((res) => {
                        setCurrentBoardId(res.data.boardId)
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        setIsLoading(false)
                    })
            } else {
                setCurrentBoardId(null)
            }
        })
        monday.listen('context', (res) => {
            setIsDarkMode(res.data.theme === "dark")
        })
    }, [])

    useEffect(() => {
        if (isDarkMode) {
            document.body.style = 'background-color: #1C1F3B;'
        } else {
            document.body.style = 'background-color: #f5f6f8;'
        }
    }, [isDarkMode])

    return (
        <Container fluid="xl">
            <Row>
                {boardId && viewerStatus !== SELECT && (
                    <MainContentContainer
                        boardId={boardId}
                        monday={monday}
                        isViewerAdmin={viewerStatus === TRAINER}
                        isDarkMode={isDarkMode}
                        isLoading={isLoading}
                        setCurrentBoardId={setCurrentBoardId}
                    />
                )}
                {viewerStatus === TRAINEE && boardId === null && (
                    <TraineeBoardSelectionContainer
                        setCurrentBoardId={setCurrentBoardId}
                        monday={monday}
                        isDarkMode={isDarkMode}
                    />
                )}
                {viewerStatus === SELECT && (
                    <TutorialContainer isDarkMode={isDarkMode} />
                )}
            </Row>
        </Container>
    )
}
  

export default App;
