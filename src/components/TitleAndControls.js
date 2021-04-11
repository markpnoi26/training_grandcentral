import React from 'react'
import Button from 'monday-ui-react-core/dist/Button.js'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer.js'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const TitleAndControls = (props) => {
    const {
        boardItemsLength,
        currBoardItemIdx,
        groupTitle,
        name,
        nextItem,
        prevItem,
        setShowEditModal,
    } = props

    return (
        <DialogContentContainer>
            <Row>
                <Col xs={12} md={8}>
                    <h1>{groupTitle}</h1>
                    <strong>
                        <p>
                            {currBoardItemIdx + 1}. {name}
                        </p>
                    </strong>
                </Col>
                <Col xs={6} md={4}>
                    <Button
                        size={Button.sizes.SMALL}
                        onClick={prevItem}
                        disabled={currBoardItemIdx === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        size={Button.sizes.SMALL}
                        onClick={nextItem}
                        disabled={currBoardItemIdx === boardItemsLength - 1}
                    >
                        Next
                    </Button>
                    <Button
                        size={Button.sizes.SMALL}
                        onClick={() => setShowEditModal(true)}
                    >
                        Edit Modal
                    </Button>
                </Col>
            </Row>
        </DialogContentContainer>
    )
}

export default TitleAndControls