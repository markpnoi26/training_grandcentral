import React from "react";

import Container from "react-bootstrap/Container";
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer.js'


const ProgressContainer = (props) => {
    const { items } = props;

    return (
        <Container>
            <DialogContentContainer>
                Progress bar will go here
            </DialogContentContainer> 
        </Container>
    )
};

export default ProgressContainer;
