import React, { useEffect, useState } from "react";


import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Spacer from '../utils-components/Spacer'
import TitleBar from './TitleBar'
import VideoInfoMetadata from './VideoInfoMetadata'


const ContentWindow = (props) => {
    const {
        boardId,
        items,
        monday,
        setTrainingItems,
        currBoardItemIdx,
        currBoardItem,
        setCurrBoardItemIdx,
        setCurrBoardItem,
        isViewerAdmin,
        isDarkMode,
        setCurrentBoardId,
    } = props
    const [boardItems, setBoardItems] = useState([])
    const [isAutoPlay, setAutoPlay] = useState(false)
    const [isAutoForward, setAutoForward] = useState(false)

    useEffect(() => {
        setBoardItems(items)
    }, [items])

    useEffect(() => {
        setCurrBoardItem(boardItems[currBoardItemIdx])
    }, [boardItems, currBoardItemIdx, setCurrBoardItem])

    const findLinkUrlByBoardItem = boardItem => {
        const linkObj = boardItem.column_values.find(
            (columnVal) => columnVal.title === 'Link'
        )
        const jsonData = JSON.parse(linkObj.value)

        return jsonData ? jsonData.url : ''
    }

    const nextItem = () => {
        setCurrBoardItemIdx(currBoardItemIdx + 1)
    }

    const prevItem = () => {
        setCurrBoardItemIdx(currBoardItemIdx - 1)
    }

    return (
        <Container fluid>
            <Spacer />
            <Row>
                <Col>
                    {currBoardItem && (
                        <TitleBar
                            boardId={boardId}
                            groupTitle={currBoardItem.group.title}
                            name={currBoardItem.name}
                            isDarkMode={isDarkMode}
                            isViewerAdmin={isViewerAdmin}
                            setCurrentBoardId={setCurrentBoardId}
                        />
                    )}
                </Col>
            </Row>
            <Spacer />
            <Row>
                <Col>
                    {currBoardItem && (
                        <VideoInfoMetadata
                            currBoardItemIdx={currBoardItemIdx}
                            boardItemsLength={boardItems.length}
                            linkUrl={findLinkUrlByBoardItem(currBoardItem)}
                            itemId={currBoardItem.id}
                            monday={monday}
                            setBoardItems={setBoardItems}
                            nextItem={nextItem}
                            prevItem={prevItem}
                            isAutoPlay={isAutoPlay}
                            isAutoForward={isAutoForward}
                            setAutoPlay={setAutoPlay}
                            setAutoForward={setAutoForward}
                            setTrainingItems={setTrainingItems}
                            setCurrBoardItemIdx={setCurrBoardItemIdx}
                            isViewerAdmin={isViewerAdmin}
                            isDarkMode={isDarkMode}
                        />
                    )}
                </Col>
            </Row>
            <Spacer />
        </Container>
    )
};

export default ContentWindow;
