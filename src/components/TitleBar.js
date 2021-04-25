import React from 'react'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer.js'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const TitleBar = (props) => {
    const {
        groupTitle,
        name,
    } = props

    return (
        <DialogContentContainer>
            <Row>
                <Col sm={12}>
                    <h3>{name}</h3>
                    <p> Section: {groupTitle}</p>
                </Col>
            </Row>
        </DialogContentContainer>
    )
}

export default TitleBar