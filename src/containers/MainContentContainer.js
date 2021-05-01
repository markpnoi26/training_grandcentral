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
                    message={
                        'This is not a valid board for this selection, select the correct view setting using the settings icon or update the board to contain Link, see basic training template.'
                    }
                />
            )}
        </Container>
    )
};

export default MainContentContainer;