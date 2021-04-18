import React, { useEffect, useState } from "react";


import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Spacer from '../utils-components/Spacer'
import TitleAndControls from './TitleAndControls'
import VideoInfoMetadata from './VideoInfoMetadata'


const ContentWindow = (props) => {
    const { items, monday } = props
    const [boardItems, setBoardItems] = useState([])
    const [currBoardItemIdx, setCurrBoardItemIdx] = useState(0)
    const [currBoardItem, setCurrBoardItem] = useState(null)

    useEffect(() => {
        setBoardItems(items)
    }, [items])

    useEffect(() => {
        // console.log(currBoardItem)
        setCurrBoardItem(boardItems[currBoardItemIdx])
    }, [boardItems, currBoardItemIdx])

    const findLinkUrlByBoardItem = boardItem => {
        const linkObj = boardItem.column_values.find(
            (columnVal) => columnVal.title === 'Link'
        )

        const linkObjArray = linkObj.text.split(" ")
        return linkObjArray[linkObjArray.length - 1]
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
                        <TitleAndControls
                            boardItemsLength={boardItems.length}
                            currBoardItemIdx={currBoardItemIdx}
                            groupTitle={currBoardItem.group.title}
                            itemId={currBoardItem.id}
                            monday={monday}
                            name={currBoardItem.name}
                            nextItem={nextItem}
                            prevItem={prevItem}
                        />
                    )}
                </Col>
            </Row>
            <Spacer />
            <Row>
                <Col>
                    {currBoardItem && (
                        <VideoInfoMetadata
                            linkUrl={findLinkUrlByBoardItem(currBoardItem)}
                            itemId={currBoardItem.id}
                            monday={monday}
                        />
                    )}
                </Col>
            </Row>
            <Spacer />
        </Container>
    )
};

export default ContentWindow;
