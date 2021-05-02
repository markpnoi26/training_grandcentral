import Button from 'monday-ui-react-core/dist/Button.js'
import DropdownChevronRight from 'monday-ui-react-core/dist/icons/DropdownChevronRight'
import DropdownChevronLeft from 'monday-ui-react-core/dist/icons/DropdownChevronLeft'
import Update from 'monday-ui-react-core/dist/icons/Update'
import Item from 'monday-ui-react-core/dist/icons/Item'
import Retry from 'monday-ui-react-core/dist/icons/Retry'
import MoveArrowRight from 'monday-ui-react-core/dist/icons/MoveArrowRight'
import TurnInto from 'monday-ui-react-core/dist/icons/TurnInto'
import Tooltip from 'monday-ui-react-core/dist/Tooltip.js'
import Spacer from '../utils-components/Spacer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React from 'react'

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
        setCurrBoardItemIdx,
        isViewerAdmin,
        isDarkMode,
    } = props

    const openUpdatesPanel = () => {
        monday.execute('openItemCard', { itemId: itemId, kind: "updates"})
    }
    const openItemCardModal = () => {
        monday.execute('openItemCard', { itemId: itemId, kind: 'columns' })
    }

    const refreshItem = () => {
        setCurrBoardItemIdx(0)
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
        <Container>
            <Spacer />
            <Row className="centered-items">
                <Col>
                    <Tooltip
                        showDelay={300}
                        content="Previous Section"
                        containerSelector="body"
                        position="bottom"
                    >
                        <Button
                            size={Button.sizes.SMALL}
                            onClick={prevItem}
                            disabled={currBoardItemIdx === 0}
                            color={
                                isDarkMode
                                    ? Button.colors.ON_PRIMARY_COLOR
                                    : Button.colors.PRIMARY
                            }
                            kind={Button.kinds.TERTIARY}
                        >
                            <DropdownChevronLeft />
                        </Button>
                    </Tooltip>
                </Col>
                <Col>
                    <Tooltip
                        showDelay={300}
                        content="Show Updates/Additional Information"
                        containerSelector="body"
                        position="bottom"
                    >
                        <Button
                            size={Button.sizes.SMALL}
                            onClick={openUpdatesPanel}
                            color={
                                isDarkMode
                                    ? Button.colors.ON_PRIMARY_COLOR
                                    : Button.colors.PRIMARY
                            }
                            kind={Button.kinds.TERTIARY}
                        >
                            <Update />
                        </Button>
                    </Tooltip>
                </Col>
                {isViewerAdmin && (
                    <Col>
                        <Tooltip
                            showDelay={300}
                            content="Open Section Item Card"
                            containerSelector="body"
                            position="bottom"
                        >
                            <Button
                                size={Button.sizes.SMALL}
                                onClick={openItemCardModal}
                                color={
                                    isDarkMode
                                        ? Button.colors.ON_PRIMARY_COLOR
                                        : Button.colors.PRIMARY
                                }
                                kind={Button.kinds.TERTIARY}
                            >
                                <Item />
                            </Button>
                        </Tooltip>
                    </Col>
                )}
                {isViewerAdmin && (
                    <Col>
                        <Tooltip
                            showDelay={300}
                            content="Refresh App"
                            containerSelector="body"
                            position="bottom"
                        >
                            <Button
                                size={Button.sizes.SMALL}
                                onClick={refreshItem}
                                color={
                                    isDarkMode
                                        ? Button.colors.ON_PRIMARY_COLOR
                                        : Button.colors.PRIMARY
                                }
                                kind={Button.kinds.TERTIARY}
                            >
                                <Retry />
                            </Button>
                        </Tooltip>
                    </Col>
                )}
                {!isViewerAdmin && (
                    <Col>
                        <Tooltip
                            showDelay={300}
                            content={`Autoplay video on load autoplay is currently ${
                                isAutoPlay ? 'on' : 'off'
                            }`}
                            containerSelector="body"
                            position="bottom"
                        >
                            <Button
                                size={Button.sizes.SMALL}
                                color={
                                    isAutoPlay
                                        ? Button.colors.POSITIVE
                                        : Button.colors.NEGATIVE
                                }
                                onClick={() => setAutoPlay(!isAutoPlay)}
                                kind={Button.kinds.TERTIARY}
                            >
                                <TurnInto />
                            </Button>
                        </Tooltip>
                    </Col>
                )}
                {!isViewerAdmin && (
                    <Col>
                        <Tooltip
                            showDelay={300}
                            content={`Move to next section automatically: Autoforward is currently ${
                                isAutoForward ? 'on' : 'off'
                            }`}
                            containerSelector="body"
                            position="bottom"
                        >
                            <Button
                                size={Button.sizes.SMALL}
                                color={
                                    isAutoForward
                                        ? Button.colors.POSITIVE
                                        : Button.colors.NEGATIVE
                                }
                                onClick={() => setAutoForward(!isAutoForward)}
                                kind={Button.kinds.TERTIARY}
                            >
                                <MoveArrowRight />
                            </Button>
                        </Tooltip>
                    </Col>
                )}
                <Col>
                    <Tooltip
                        showDelay={300}
                        content="Next Section"
                        containerSelector="body"
                        position="bottom"
                    >
                        <Button
                            size={Button.sizes.SMALL}
                            onClick={nextItem}
                            color={
                                isDarkMode
                                    ? Button.colors.ON_PRIMARY_COLOR
                                    : Button.colors.PRIMARY
                            }
                            disabled={currBoardItemIdx === boardItemsLength - 1}
                            kind={Button.kinds.TERTIARY}
                        >
                            <DropdownChevronRight />
                        </Button>
                    </Tooltip>
                </Col>
            </Row>
        </Container>
    )
}

export default ControlBar