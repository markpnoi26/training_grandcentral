import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { MultiStepIndicator } from "monday-ui-react-core";

const ProgressContainer = (props) => {
    const FULFILLED = MultiStepIndicator.stepStatuses.FULFILLED;
    const ACTIVE = MultiStepIndicator.stepStatuses.ACTIVE;
    const PENDING = MultiStepIndicator.stepStatuses.PENDING;

    const [itemsSteps, setItemSteps] = useState([])
    const { items } = props;

    console.log(items)

    useEffect(() => {
        const itemStepsArray  = []
        if (items.length > 0) {
            items.forEach(item => {
                itemStepsArray.push({
                    status: PENDING,
                    titleText: item.name,
                    subtitleText: 'test subtitle'
                })
            })
            setItemSteps(itemStepsArray);
        }
    }, [items])



    return (
        <Container>
            {itemsSteps.length !== 0 && (
                <MultiStepIndicator type={MultiStepIndicator.types.PRIMARY} steps={itemsSteps}/>
            )}
        </Container>
    )
};

export default ProgressContainer;
