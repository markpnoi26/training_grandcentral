import React, { useState, useEffect } from "react";
import ContentWindow from "../components/MainComponents/ContentWindow";
import ProgressBar from "../components/MainComponents/ProgressBar";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const MainContentContainer = (props) => {
    const { monday, setIsInSelection, setCurrUserStatus } = props;

    const [isUserOwner, setIsUserOwner] = useState(true)

    // update board to populate training sections
    // update board to include multiple trainees
    // update board with draggable components
    // be able to set training ID which is the board ID training
    // 

    const [context, setContext] = useState({})
    const [currentBoardId, setCurrentBoardId] = useState(null)
    const [items, setTrainingItems] = useState([])
    const [currentItemToAdd, setCurrentItemToAdd] = useState('')
    const [currentMediaToAdd, setCurerntMediaToAdd] = useState('')

    useEffect(() => {
        monday.listen('context', res => {
            const data = res.data
            setContext(data)
            setCurrentBoardId(data.boardId)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {   
        monday
          .api(
            `
            query {
                boards (ids: [${currentBoardId}], limit:1, ) {
                    name 
                    items {
                        name
                        group {
                            title
                        }
                        column_values {
                            title
                            text
                        }
                    }
                }
            }
          `
          )
          .then((response) => {
              // check here for items structure, 
              // if correct structure render if not mutate to correct structure and then render
              if (response.data.boards[0] !== undefined) setTrainingItems(response.data.boards[0].items)
          })
          .catch((error) => console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBoardId])
    
    return (
        <Container>
        <Row>
            <ContentWindow items={items}/>
        </Row>
        <Row>
            <ProgressBar items={items}/>
        </Row>

        <button onClick={() => {
            setIsInSelection(true)
            setCurrUserStatus('')
        }}>go back</button>
        </Container>
    );
};

export default MainContentContainer;