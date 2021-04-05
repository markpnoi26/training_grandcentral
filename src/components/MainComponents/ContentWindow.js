import React, { useEffect, useState } from "react";

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Spacer from '../../utils-components/Spacer'

import Button from "monday-ui-react-core/dist/Button.js";
import DialogContentContainer from "monday-ui-react-core/dist/DialogContentContainer.js";
import Icon from "monday-ui-react-core/dist/Icon"
import MenuItem from "monday-ui-react-core/dist/MenuItem"

import ReactPlayer from 'react-player'

const ContentWindow = (props) => {
    const { items } = props
    const [showEditModal, setShowEditModal] = useState(false)
    const [boardItems, setBoardItems] = useState([])
    const [currBoardItemIdx, setCurrBoardItemIdx] = useState(0)

    useEffect(() => {
        setBoardItems(items)
    }, [items])

    useEffect(() => {
        // console.log(boardItems)
    }, [boardItems])

    return (
        <Container fluid>
            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Edit Training Content
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Edit Window Goes Here</p>
                </Modal.Body>
            </Modal>
            <Spacer />
            <Row>
                <Col>
                    <DialogContentContainer>
                        <h1>Title</h1>
                        <Button
                            onClick={() => {
                                setCurrBoardItemIdx(
                                    currBoardItemIdx === 0
                                        ? boardItems.length - 1
                                        : currBoardItemIdx - 1
                                )
                            }}
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={() => {
                                setCurrBoardItemIdx(
                                    currBoardItemIdx === boardItems.length - 1
                                        ? 0
                                        : currBoardItemIdx + 1
                                )
                            }}
                        >
                            Next
                        </Button>
                        <Button onClick={() => setShowEditModal(true)}>
                            Edit Modal
                        </Button>
                    </DialogContentContainer>
                </Col>
            </Row>
            <Spacer />
            <Row>
                <Col>
                    <DialogContentContainer>
                        <Row>
                            <Col sm={8}>
                                {boardItems.length > 0 &&
                                    boardItems[currBoardItemIdx]
                                        .column_values[0] && (
                                        <ReactPlayer
                                            url={
                                                boardItems[currBoardItemIdx]
                                                    .column_values[0].text
                                            }
                                            controls
                                            width="100%"
                                        />
                                    )}
                            </Col>
                            <Col sm={3}>
                                <MenuItem
                                    id="menu-item1"
                                    title={'My item1'}
                                    icon={Icon.type.SVG}
                                    disabled={false}
                                    selected={false}
                                    onClick={() => alert('hello')}
                                />
                            </Col>
                        </Row>
                    </DialogContentContainer>
                </Col>
            </Row>
            <Spacer />
        </Container>
    )
};

export default ContentWindow;
