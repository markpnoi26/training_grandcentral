import React, { useEffect } from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DialogContentContainer from 'monday-ui-react-core/dist/DialogContentContainer.js'

import ReactPlayer from 'react-player'

const VideoInfoMetadata = props => {

    const {itemId, linkUrl, monday} = props

    useEffect(() => {
        monday.api(`query {
            items (ids: [${itemId}], limit:1, ) {
                updates {
                    id
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
        }
        `).then(res => console.log(res))
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
                    updates go heren as well as other stuff
                </Col>
            </Row>
        </DialogContentContainer>
    )
}


export default VideoInfoMetadata
 

