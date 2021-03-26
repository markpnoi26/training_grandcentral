import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const TrainingCreationContainer = (props) => {

    const { monday, setIsInSelection, setCurrUserStatus } = props; 

    // update board to populate training sections
    // update board to include multiple trainees
    // update board with draggable components
    // be able to set training ID which is the board ID training
    // 

    return (
        <Container>
            <Row>
                <h1>I am the Training Creation Container</h1>
            </Row>
            <button onClick={() => {
                setIsInSelection(true)
                setCurrUserStatus('')
            }}>go back</button>
        </Container>
    );
};

export default TrainingCreationContainer;
