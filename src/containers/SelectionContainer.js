import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";

const SelectionContainer = (props) => {

    const { setCurrUserStatus, setIsInSelection, TRAINEE, TRAINER } = props;

    return (
        <Container>
            <Row>
                <h1>I am Selection Container</h1>
                <button
                    onClick={() => {
                        setCurrUserStatus(TRAINEE);
                        setIsInSelection(false);
                    }}
                >
                    I am a Trainee
                </button>
                <button
                    onClick={() => {
                        setCurrUserStatus(TRAINER);
                        setIsInSelection(false);
                    }}
                >
                    I am a Trainer
                </button>
                <AttentionBox />
            </Row>
        </Container>
    );
};

export default SelectionContainer;
