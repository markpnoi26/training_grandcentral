import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Dropdown from 'monday-ui-react-core/dist/Dropdown.js'

const TraineeBoardSelectionContainer = (props) => {
    const {setCurrentBoardId, monday} = props;
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
        setCurrentTitleToLook(event.value)
    }

    return (
        <Container>
            Set Board IDs to correct column to fetch all board ids or create a
            new column to store all your training sessions
            <Dropdown
                id="column-selection"
                disabled={false}
                clearable={true}
                rtl={false}
                searchable={true}
                name="column-title"
                options={columnValueSelection}
                size={Dropdown.size.SMALL}
                placeholder={'Dropdown placeholder'}
                onChange={setSelectedColumnSelection}
                menuPortalTarget={document.body}
            />
            {possibleBoardIds.length > 0 ? (
                <ol>
                    {possibleBoardIds.map((id) => (
                        <li onClick={() => setCurrentBoardId(id)}> {id}</li>
                    ))}
                </ol>
            ) : (
                'no valid board ids found, select a different column, or add board ids from your team'
            )}
        </Container>
    )
}

export default TraineeBoardSelectionContainer