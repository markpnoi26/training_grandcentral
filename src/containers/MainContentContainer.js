import React, { useState, useEffect } from "react";
import ErrorMessage from '../components/ErrorMessage'
import ContentWindow from "../components/ContentWindow";
import ProgressBar from "../components/ProgressBar";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spacer from "../utils-components/Spacer";

const MainContentContainer = (props) => {
    const {
        monday,
        boardId,
        isLoading,
        isViewerAdmin,
        isDarkMode,
        setCurrentBoardId,
    } = props

    const [items, setTrainingItems] = useState([])
    const [isValidBoardStructure, setIsValidBoardStructure] = useState(false)
    const [currBoardItemIdx, setCurrBoardItemIdx] = useState(0)
    const [currBoardItem, setCurrBoardItem] = useState(null)

    const checkLinkExists = (columnValues) => {
        return columnValues.find((col) => col.title === 'Link')
    }

    useEffect(() => {
        monday
            .api(
                `
                query {
                    boards (ids: [${boardId}], limit:1, ) {
                        name 
                        items {
                            id
                            name
                            group {
                                title
                            }
                            column_values {
                                title
                                text
                                value
                            }
                        }
                    }
                }
            `
            )
            .then((response) => {
                const boards = response.data.boards
                const sampleBoardItemColumnValues = boards[0].items[0].column_values 
                if (
                    boards !== undefined && checkLinkExists(sampleBoardItemColumnValues)
                ) {
                    setTrainingItems(boards[0].items)
                    setIsValidBoardStructure(true)
                } else {
                    setTrainingItems([])
                    setIsValidBoardStructure(false)
                }
            })
            .catch((error) => {
                setTrainingItems([])
                setIsValidBoardStructure(false)
            })
    }, [boardId, monday])
    
    return (
        <Container>
            <Spacer />
            {isValidBoardStructure && !isLoading && (
                <>
                    <Row>
                        <ContentWindow
                            boardId={boardId}
                            currBoardItem={currBoardItem}
                            currBoardItemIdx={currBoardItemIdx}
                            items={items}
                            monday={monday}
                            setCurrBoardItem={setCurrBoardItem}
                            setCurrBoardItemIdx={setCurrBoardItemIdx}
                            setTrainingItems={setTrainingItems}
                            isViewerAdmin={isViewerAdmin}
                            isDarkMode={isDarkMode}
                            setCurrentBoardId={setCurrentBoardId}
                        />
                    </Row>
                    <Row>
                        <ProgressBar
                            items={items}
                            currBoardItemIdx={currBoardItemIdx}
                            isDarkMode={isDarkMode}
                        />
                    </Row>
                </>
            )}
            {!isValidBoardStructure && !isLoading && (
                <ErrorMessage
                    setCurrentBoardId={setCurrentBoardId}
                    message={
                        'Either this is not a valid Board ID or not a valid board structure. If you are in training collection view, add a valid board ID, if you are in training view, update the column to contain a Link, with valid video URLs.'
                    }
                />
            )}
        </Container>
    )
};

export default MainContentContainer;