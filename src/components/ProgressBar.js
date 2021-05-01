import React, {useEffect, useState} from "react";

import Container from "react-bootstrap/Container";
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer.js'
import LinearProgressBar from 'monday-ui-react-core/dist/LinearProgressBar.js'


const ProgressContainer = (props) => {
    const { items, currBoardItemIdx, isDarkMode } = props
    const [currProgressValue, setCurrProgressValue] = useState(0)

    useEffect(() => {
        if (items !== undefined && currBoardItemIdx !== undefined) {
            setCurrProgressValue(
                Math.ceil(((currBoardItemIdx + 1) / items.length) * 100)
            )
        }
    }, [currBoardItemIdx, currProgressValue, items])

    return (
        <Container>
            <DialogContentContainer className={isDarkMode? 'dark-mode-dialog-container': ''}>
                <LinearProgressBar
                    className={isDarkMode? 'dark-mode-progress-bar': ''}
                    value={currProgressValue}
                    animated={true}
                    max={100}
                    min={1}
                    size={LinearProgressBar.sizes.MEDIUM}
                    barStyle={LinearProgressBar.styles.POSITIVE}
                    indicateProgress={true}
                />
            </DialogContentContainer>
        </Container>
    )
};

export default ProgressContainer;
