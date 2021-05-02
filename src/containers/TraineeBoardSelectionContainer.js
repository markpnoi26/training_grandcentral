import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spacer from '../utils-components/Spacer'

import Tooltip from 'monday-ui-react-core/dist/Tooltip'
import Retry from 'monday-ui-react-core/dist/icons/Retry'
import Enter from 'monday-ui-react-core/dist/icons/Enter'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer'
import Dropdown from 'monday-ui-react-core/dist/Dropdown'
import Button from 'monday-ui-react-core/dist/Button'

const TraineeBoardSelectionContainer = (props) => {
    const {setCurrentBoardId, isDarkMode, monday} = props;
    const [contextBoardId, setContextBoardId] = useState(null)
    const [columnValueSelection, setColumnValueSelection] = useState([])
    const [currentTitleToLook, setCurrentTitleToLook] = useState('')
    const [currentBoardItems, setCurrentBoardItems] = useState([])
    const [possibleBoardIds, setPossibleBoardIds] = useState([])
    
    useEffect(() => {
        monday.listen('context', (response) =>
            setContextBoardId(response.data.boardId)
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => { 
        monday
            .api(
                `
                query {
                    boards (ids: [${contextBoardId}], limit:1, ) {
                        name 
                        items {
                            id
                            name
                            group {
                                title
                            }
                            column_values {
                                title
                                text
                                value
                            }
                        }
                    }
                }
            `
            )
            .then((response) => {
                setColumnValueSelection(getColumnValueSelections(response))
                setCurrentBoardItems(response.data.boards[0].items)
            })
            .catch((error) => {
                setColumnValueSelection([])
            })
    }, [contextBoardId, monday])

    useEffect(() => {
        const candidates = getCandidateBoardIds(currentBoardItems)
        const digitCheck = /^\d+$/
        setPossibleBoardIds(candidates.filter(candidate => digitCheck.test(candidate)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTitleToLook])

    const refreshApp = () => {
        setContextBoardId(null)
        monday.get('context')
            .then((response) => {
                console.log(response)
                setContextBoardId(response.data.boardId)
            })
            .catch((error) => console.log(error))
    }

    const getCandidateBoardIds = (boardItems) => {
        const candidates = []

        for (let boardItem of boardItems) {
            const colValues = boardItem.column_values
            const titleVal = colValues.find(
                (column) => column.title === currentTitleToLook
            ).text
            candidates.push(titleVal)
        }

        return candidates
    }

    const getColumnValueSelections = (response) => {
        const selection = []
        const titles = response.data.boards[0].items[0].column_values.map(colVal => colVal.title)
        for (let title of titles) {
            selection.push({
                value: title,
                label: title,
                isFixed:  true,
            })
        }
        return selection
    }

    const setSelectedColumnSelection = (event) => {
        if (event !== null) {
            setCurrentTitleToLook(event.value)
        } else {
            setCurrentTitleToLook("")
        }
    }

    const findItemNameById = (id) => {
        for (let boardItem of currentBoardItems) {
            if (boardItem.column_values.find(item => item.text === id)) {
                return boardItem.name
            }
        }
    }

    return (
        <Container fluid="md">
            <Spacer />
            <DialogContentContainer
                className={isDarkMode ? 'dark-mode-dialog-container' : ''}
            >
                <Row>
                    <Col sm="12">
                        <div
                            style={{
                                fontSize: '16px',
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                            }}
                        >
                            <Tooltip
                                showDelay={300}
                                content="Refresh Selection"
                                containerSelector="body"
                                position="bottom"
                            >
                                <Button
                                    size={Button.sizes.SMALL}
                                    onClick={refreshApp}
                                    color={
                                        isDarkMode
                                            ? Button.colors.ON_PRIMARY_COLOR
                                            : Button.colors.PRIMARY
                                    }
                                    kind={Button.kinds.TERTIARY}
                                >
                                    <Retry />
                                </Button>
                            </Tooltip>
                            Select the board column containing valid training board ids:
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Dropdown
                            id="column-selection"
                            disabled={false}
                            clearable={false}
                            rtl={false}
                            searchable={true}
                            name="column-title"
                            options={columnValueSelection}
                            size={Dropdown.size.SMALL}
                            placeholder={'Columns'}
                            onChange={setSelectedColumnSelection}
                        />
                    </Col>
                </Row>
                <Spacer />
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '15%', textAlign: 'center' }}>
                                ID
                            </th>
                            <th style={{ width: '80%' }}>Session Name</th>
                            <th style={{ width: '5%', textAlign: 'center' }}>
                                Go
                            </th>
                        </tr>
                    </thead>
                    {possibleBoardIds.length > 0 ? (
                        <tbody>
                            {possibleBoardIds.map((id) => (
                                <tr>
                                    <td style={{ textAlign: 'center' }}>
                                        {id}
                                    </td>
                                    <td>{findItemNameById(id)}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button
                                            size={Button.sizes.SMALL}
                                            onClick={() =>
                                                setCurrentBoardId(id)
                                            }
                                            kind={Button.kinds.TERTIARY}
                                            color={
                                                isDarkMode
                                                    ? Button.colors
                                                          .ON_PRIMARY_COLOR
                                                    : Button.colors.PRIMARY
                                            }
                                        >
                                            <Enter />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        ''
                    )}
                </table>
            </DialogContentContainer>
        </Container>
    )
}

export default TraineeBoardSelectionContainer