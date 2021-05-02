import React, {useState, useEffect }from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spacer from '../utils-components/Spacer'
import Banner from 'monday-ui-react-core/dist/Banner'
import Spinner from 'react-bootstrap/Spinner'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer'

const ErrorMessage = (props) => {
    const { isLoading } = props
    const [isDelayed, setIsDelayed] = useState(false)
    
    useEffect(() => {
        setTimeout(() => setIsDelayed(true), 2000)
    }, [])

    return (
        <Container fluid="xl">
            <Spacer />
            {!isDelayed && (
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
            {!isLoading && isDelayed && (
                <Row>
                    <Col>
                        <Banner
                            title={'Wrong Selection or no Valid boards'}
                            subtitle={props.message}
                            onClose={() => props.setCurrentBoardId(null)}
                            rtl={false}
                        />
                    </Col>
                </Row>
            )}
        </Container>
    )    
}

export default ErrorMessage