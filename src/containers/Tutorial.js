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
                        Tutorial Center
                    </DialogContentContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default TutorialContainer
