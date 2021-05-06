import React, { useState, useEffect } from 'react'
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
    const CURRENT_BOARD_ID = 'current-board-id'
    
    const [copied, setCopied] = useState('')

    useEffect(() =>{
        let messageTimeOut
        if (copied) {
            messageTimeOut = setTimeout(() => setCopied(''), 3000)
        }

        return () => {
            clearTimeout(messageTimeOut)
        }
    }, [copied])

    const truncateTitle = (title) => {
        let newTitle = title
        if (title.length > 45) {
            newTitle = title.slice(0,45) + "..."
        }
        return newTitle
    }

    const copyBoardIdToClipboard = () => {
        let id = document.querySelector(`#${CURRENT_BOARD_ID}`)
        id.focus()
        id.select()
        try {
            document.execCommand('copy')
            setCopied("Copied!")
        } catch (err) {
            setCopied("Copy failed!")
        }

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
                    <div
                        style={{
                            fontSize: '16px',
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                        }}
                    >
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
                                content={
                                    copied === ''
                                        ? 'Copy board ID to clipboard'
                                        : copied
                                }
                                containerSelector="body"
                                position="bottom"
                            >
                                <Button
                                    kind={Button.kinds.TERTIARY}
                                    size={Button.sizes.SMALL}
                                    onClick={copyBoardIdToClipboard}
                                    color={
                                        isDarkMode
                                            ? Button.colors.ON_PRIMARY_COLOR
                                            : Button.colors.PRIMARY
                                    }
                                >
                                    <Duplicate />
                                </Button>
                            </Tooltip>
                        )}{' '}
                        {groupTitle}
                        <textarea
                            style={{
                                resize: 'none',
                                width: '0',
                                height: '0',
                                position: 'absolute',
                                zIndex: '-1',
                                opacity: '.01',
                            }}
                            readonly
                            id={CURRENT_BOARD_ID}
                        >
                            {boardId}
                        </textarea>
                    </div>
                </Col>
            </Row>
        </DialogContentContainer>
    )
}

export default TitleBar