import React, { useState, useEffect } from "react";
import ContentWindow from "../components/ContentWindow";
import ProgressBar from "../components/ProgressBar";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const MainContentContainer = (props) => {
    const { monday, boardId } = props;

    // update board to populate training sections
    // update board to include multiple trainees
    // update board with draggable components
    // be able to set training ID which is the board ID training

    const [items, setTrainingItems] = useState([])

    useEffect(() => {
        monday
            .api(
                `
                query {
                    boards (ids: [${boardId}], limit:1, ) {
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
                            }
                        }
                    }
                }
            `
            )
            .then((response) => {
                // check here for items structure,
                // if correct structure render if not mutate to correct structure and then render
                const boards = response.data.boards
                const sampleBoardItemColumn = boards[0].items[0].column_values 
                if (boards !== undefined && sampleBoardItemColumn.find(col => col.title === "Link")) {
                    setTrainingItems(boards[0].items)
                } else {
                    setTrainingItems([])
                }
            })
            .catch((error) => {
                setTrainingItems([])
                console.log(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boardId])
    
    return (
        <Container>
            <Row>
                <ContentWindow monday={monday} items={items}/>
            </Row>
            <Row>
                <ProgressBar items={items}/>
            </Row>
        </Container>
    );
};

export default MainContentContainer;