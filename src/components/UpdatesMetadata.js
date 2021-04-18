import React, { useState, useEffect } from 'react'

const UpdatesMetadata = props => {
    const {monday, updates, itemId} = props
    console.log(props.updates)
    const openUpdatesPanel = () => {
        monday.execute('openItemCard', { itemId: itemId, kind: "updates"})
    }

    return (
        <>
            Main Updates
            <ol>
                {updates.map((update) => (
                    <li key={update.id}>{update.text_body} </li>
                ))}
            </ol>
            <button onClick={openUpdatesPanel}>view updates</button>
        </>
    )
}

export default UpdatesMetadata