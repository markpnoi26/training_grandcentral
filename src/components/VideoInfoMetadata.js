import React, { useEffect, useState } from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer.js'
import UpdatesMetadata from './UpdatesMetadata.js'

import ReactPlayer from 'react-player'

const VideoInfoMetadata = props => {
    const {itemId, linkUrl, monday} = props
    const [updates, setUpdates] = useState(null)
    const [accountId, setAccountId] = useState(null)

    useEffect(() => {
        monday.api(`query {
            items (ids: [${itemId}], limit:1, ) {
                updates {
                    id
                    creator {
                        id
                        url
                        photo_small
                        photo_tiny
                    }
                    text_body
                    replies {
                        text_body
                        id
                    }
                    assets {
                        id
                    }
                }
            }
        }`).then(res => {
            setUpdates(res.data.items[0].updates)
            setAccountId(res.account_id)
        }).catch(err => {
            console.log(err)
        })
    }, [itemId, monday])

    return (
        <DialogContentContainer>
            <Row>
                <Col sm={8}> 
                    <ReactPlayer
                        url={linkUrl}
                        controls
                        width="100%"
                    />
                </Col>
                <Col sm={3}>
                    { accountId && updates &&
                        <UpdatesMetadata itemId={itemId} updates={updates} accountId={accountId} monday={monday}/>
                    }
                </Col>
            </Row>
        </DialogContentContainer>
    )
}


export default VideoInfoMetadata
 

