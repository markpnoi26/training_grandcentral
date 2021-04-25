import Button from 'monday-ui-react-core/dist/Button.js'
import Form from 'react-bootstrap/Form'
import React, { useState, useEffect } from 'react'

const ControlBar = props => {
    const {
        monday,
        boardId,
        itemId,
        currBoardItemIdx,
        nextItem,
        prevItem,
        boardItemsLength,
        isAutoPlay,
        isAutoForward,
        setAutoForward,
        setAutoPlay,
        setTrainingItems,
        isViewerAdmin,
    } = props

    const openUpdatesPanel = () => {
        monday.execute('openItemCard', { itemId: itemId, kind: "updates"})
    }
    const openItemCardModal = () => {
        monday.execute('openItemCard', { itemId: itemId, kind: 'columns' })
    }

    const refreshItem = () => {
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
                const sampleBoardItemColumn = boards[0].items[0].column_values
                if (
                    boards !== undefined &&
                    sampleBoardItemColumn.find((col) => col.title === 'Link')
                ) {
                    setTrainingItems(boards[0].items)
                } 
            })
            .catch((error) => {
                setTrainingItems([])
                console.log(error)
            })
    }

    return (
        <>
            <Button
                size={Button.sizes.SMALL}
                onClick={prevItem}
                disabled={currBoardItemIdx === 0}
            >
                Previous
            </Button>
            <Button size={Button.sizes.SMALL} onClick={openUpdatesPanel}>
                Updates & Additional Material
            </Button>
            {isViewerAdmin &&
                <Button size={Button.sizes.SMALL} onClick={openItemCardModal}>
                    Item Card
                </Button>
            }
            {isViewerAdmin &&
                <Button size={Button.sizes.SMALL} onClick={refreshItem}>
                    Refresh
                </Button>
            }
            <Button
                size={Button.sizes.SMALL}
                onClick={nextItem}
                disabled={currBoardItemIdx === boardItemsLength - 1}
            >
                Next
            </Button>
            <Form.Check
                value={isAutoPlay}
                checked={isAutoPlay}
                onChange={() => setAutoPlay(!isAutoPlay)}
                type="switch"
                id="autoplay-switch"
                label="Auto Play"
            />
            <Form.Check
                value={isAutoForward}
                checked={isAutoForward}
                onChange={() => setAutoForward(!isAutoForward)}
                type="switch"
                id="autoforward-switch"
                label="Auto Forward"
            />
        </>
    )
}

export default ControlBar