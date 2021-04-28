import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spacer from '../utils-components/Spacer'
import AttentionBox from 'monday-ui-react-core/dist/AttentionBox'


const ErrorMessage = (props) => {
    return (
        <Container>
            <Spacer />
            <Row> 
                <Col>
                    <AttentionBox 
                        title={"Wrong Selection or no Valid boards"}
                        text={props.message}
                    />
                </Col>
            </Row>
        </Container>
    )    
}

export default ErrorMessage