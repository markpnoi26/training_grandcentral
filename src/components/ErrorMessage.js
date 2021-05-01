import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spacer from '../utils-components/Spacer'
import AttentionBox from 'monday-ui-react-core/dist/AttentionBox'
import Spinner from 'react-bootstrap/Spinner'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer'

const ErrorMessage = (props) => {
    return (
        <Container fluid="xl">
            <Spacer />
            {props.isLoading && (
                <DialogContentContainer>
                    <Spacer />
                    <Row style={{ textAlign: 'center' }}>
                        <Col>
                            <Spinner animation="border" />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Col>Loading...</Col>
                    </Row>
                    <Spacer />
                </DialogContentContainer>
            )}
            {!props.isLoading && (
                <Row>
                    <Col>
                        <AttentionBox
                            title={'Wrong Selection or no Valid boards'}
                            text={props.message}
                        />
                    </Col>
                </Row>
            )}
        </Container>
    )    
}

export default ErrorMessage