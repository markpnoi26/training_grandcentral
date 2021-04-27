import React from 'react'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer.js'
import Tooltip from 'monday-ui-react-core/dist/Tooltip.js'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const TitleBar = (props) => {
    const { groupTitle, name, isDarkMode } = props

    const truncateTitle = (title) => {
        let newTitle = title
        if (title.length > 45) {
            newTitle = title.slice(0,45) + "..."
        }
        return newTitle
    }

    return (
        <DialogContentContainer
            className={isDarkMode ? 'dark-mode-dialog-container' : ''}
        >
            <Row>
                <Col sm={12}>
                    <Tooltip
                        showDelay={300}
                        content={name}
                        containerSelector="body"
                        position="bottom"
                    >
                        <div style={{ fontSize: '32px', fontWeight: 'bolder' }}>
                            {truncateTitle(name)}
                        </div>
                    </Tooltip>
                    <div style={{ fontSize: '14px', fontWeight: 'bolder' }}>
                        {' '}
                        Group: {groupTitle}
                    </div>
                </Col>
            </Row>
        </DialogContentContainer>
    )
}

export default TitleBar