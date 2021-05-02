import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Spacer from '../utils-components/Spacer'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer'


const TutorialContainer = (props) => {
    const { isDarkMode } = props

    return (
        <Container fluid="sm">
            <Spacer />
            <Row>
                <Col>
                    <DialogContentContainer
                        className={
                            isDarkMode ? 'dark-mode-dialog-container' : ''
                        }
                    >
                        <div
                            style={{
                                fontSize: '24px',
                                fontWeight: 'bolder',
                                textAlign: 'center',
                                alignContent: 'center',
                            }}
                        >
                            Getting Started:
                        </div>
                        <div
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <p>
                                You have two view selections, one for training
                                collection, one for general training session.
                            </p>
                            <div
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    width="25%"
                                    alt="show settings start"
                                    src="show_settings_start.gif"
                                />
                            </div>
                            <Spacer />
                            <p>
                                Add basic training from board templates, install
                                the app and select{' '}
                                <strong>Training View</strong> from settings
                                selection, and cycle through the training
                                section using the app. Requires a{' '}
                                <strong>Link</strong> column. Only the first
                                column named Link will be used for video urls.
                            </p>
                            <div>
                                <img
                                    width="25%"
                                    alt="copy board id"
                                    src="copy_board_id.png"
                                />
                            </div>
                            <p>
                                At the top left corner, you can copy the board
                                id.
                            </p>
                            <div>
                                <img
                                    width="75%"
                                    alt="training collection board"
                                    src="training_collection_board.png"
                                />
                            </div>
                            <p>
                                You can add this to another board that has a
                                collection of all the board ids with a training
                                structure similar to{' '}
                                <strong> monday basic training. </strong>
                            </p>
                            <div>
                                <img
                                    width="75%"
                                    alt="training collection view"
                                    src="show_board_collection.gif"
                                />
                            </div>
                            <p>
                                You can now have access to boards under
                                <strong>Training Collection! </strong>
                                Create different training boards and add them to
                                a training collection board to keep track of
                                your team's training progress.
                            </p>
                            <div>
                                <img
                                    width="75%"
                                    alt="track team progress"
                                    src="keep_track.png"
                                />
                            </div>
                            <p>
                                That's all there is to it!
                            </p>
                        </div>
                    </DialogContentContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default TutorialContainer
