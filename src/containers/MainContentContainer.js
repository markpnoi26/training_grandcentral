import React from "react";
import ContentWindow from "../components/MainComponents/ContentWindow";
import ProgressBar from "../components/MainComponents/ProgressBar";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const MainContentContainer = (props) => {
    return (
        <Container>
        <Row>
            <ContentWindow />
        </Row>
        <Row>
            <ProgressBar />
        </Row>
        </Container>
    );
};

export default MainContentContainer;