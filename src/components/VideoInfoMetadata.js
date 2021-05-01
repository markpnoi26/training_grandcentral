import React, { useEffect, useState } from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer.js'
import ControlBar from './ControlBar.js'

import ReactPlayer from 'react-player'

const VideoInfoMetadata = props => {
    const {
        itemId,
        linkUrl,
        prevItem,
        nextItem,
        monday,
        currBoardItemIdx,
        boardItemsLength,
        isAutoPlay,
        isAutoForward,
        setAutoForward,
        setAutoPlay,
        setTrainingItems,
        isViewerAdmin,
        isDarkMode,
        setCurrentBoardId,
    } = props
    const [boardId, setBoardId] = useState(null)
    const [accountId, setAccountId] = useState(null)

    useEffect(() => {
        monday.api(`query {
            items (ids: [${itemId}], limit:1, ) {
                board {
                        id
                    }
            }
        }`).then(res => {
            setBoardId(res.data.items[0].board.id)
            setAccountId(res.account_id)
        }).catch(err => {
            console.log(err)
        })
    }, [itemId, monday])

    const playNext = () => {
        if (isAutoForward) {
            nextItem()
        } 
    }


    return (
        <DialogContentContainer
            className={isDarkMode ? 'dark-mode-dialog-container' : ''}
        >
            <Row>
                <Col sm={12}>
                    {linkUrl !== '' ? (
                        <ReactPlayer
                            url={linkUrl}
                            controls
                            width="100%"
                            height="480px"
                            playing={isAutoPlay}
                            onEnded={playNext}
                        />
                    ) : (
                        'There\'s no video associated with this page, refer to "Updates & Additional Materials" button below or contact the owner of this board for more information.'
                    )}
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    {accountId && (
                        <ControlBar
                            itemId={itemId}
                            accountId={accountId}
                            boardId={boardId}
                            monday={monday}
                            prevItem={prevItem}
                            nextItem={nextItem}
                            currBoardItemIdx={currBoardItemIdx}
                            boardItemsLength={boardItemsLength}
                            isAutoPlay={isAutoPlay}
                            setAutoPlay={setAutoPlay}
                            isAutoForward={isAutoForward}
                            setAutoForward={setAutoForward}
                            setTrainingItems={setTrainingItems}
                            isViewerAdmin={isViewerAdmin}
                            setCurrentBoardId={setCurrentBoardId}
                        />
                    )}
                </Col>
            </Row>
        </DialogContentContainer>
    )
}


export default VideoInfoMetadata
 

