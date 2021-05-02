import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Spacer from '../utils-components/Spacer'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer'


const TutorialContainer = (props) => {
    const { isDarkMode } = props

    return (
        <Container fluid="xl">
            <Spacer />
            <Row>
                <Col>
                    <DialogContentContainer
                        className={
                            isDarkMode ? 'dark-mode-dialog-container' : ''
                        }
                    >
                        <div style={{fontSize: "24px", fontWeight: "bolder"}}>Getting Started</div>
                        <p>
                            Create a training board similar to monday.com basic
                            training template (with Link column).
                            <img
                                width="100%"
                                alt="find basic training template"
                                src="find_monday_basic_training.gif"
                            />
                        </p>
                        <p>
                            Collections board needs a column that contains other
                            training boards.
                            <img
                                width="100%"
                                alt="create training collection item with Board ID column"
                                src="create_training_collection_item.gif"
                            />
                        </p>
                        <p>
                            Grab the board ID from training view.
                            <img
                                width="100%"
                                alt="get board id"
                                src="grab_board_id_from_training_view.gif"
                            />
                        </p>
                        <p>
                            Training collection keeps all training sessions in
                            one place.
                            <img
                                width="100%"
                                alt="create training collection item with Board ID column"
                                src="view_from_collection.gif"
                            />
                        </p>
                    </DialogContentContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default TutorialContainer
