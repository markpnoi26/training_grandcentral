import React from 'react'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer.js'
import Duplicate from 'monday-ui-react-core/dist/icons/Duplicate'
import Group from 'monday-ui-react-core/dist/icons/Group'
import Button from 'monday-ui-react-core/dist/Button'
import Tooltip from 'monday-ui-react-core/dist/Tooltip.js'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const TitleBar = (props) => {
    const {
        groupTitle,
        name,
        isDarkMode,
        isViewerAdmin,
        boardId,
        setCurrentBoardId,
    } = props

    const truncateTitle = (title) => {
        let newTitle = title
        if (title.length > 45) {
            newTitle = title.slice(0,45) + "..."
        }
        return newTitle
    }

    const copyBoardIdToClipboard = () => {
        // TODO(mdelgado): gotta change this part
        console.log(boardId)
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
                        <div style={{ fontSize: '24px', fontWeight: 'bolder' }}>
                            {truncateTitle(name)}
                        </div>
                    </Tooltip>
                    <div style={{ fontSize: '16px', display: "flex", justifyContent: 'left', alignItems: 'center' }}>
                        {!isViewerAdmin ? (
                            <Tooltip
                                showDelay={300}
                                content="Back to Selection"
                                containerSelector="body"
                                position="bottom"
                            >
                                <Button
                                    kind={Button.kinds.TERTIARY}
                                    size={Button.sizes.SMALL}
                                    onClick={() => setCurrentBoardId(null)}
                                    color={Button.colors.ON_PRIMARY_COLOR}
                                >
                                    <Group />
                                </Button>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                showDelay={300}
                                content="Copy Board ID to Clipboard"
                                containerSelector="body"
                                position="bottom"
                            >
                                <Button
                                    kind={Button.kinds.TERTIARY}
                                    size={Button.sizes.SMALL}
                                    onClick={copyBoardIdToClipboard}
                                    color={Button.colors.ON_PRIMARY_COLOR}
                                >
                                    <Duplicate />
                                </Button>
                            </Tooltip>
                        )}{' '} Group: {groupTitle}{' '}
                    </div>
                </Col>
            </Row>
        </DialogContentContainer>
    )
}

export default TitleBar