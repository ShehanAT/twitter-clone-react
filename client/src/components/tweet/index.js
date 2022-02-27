import React from 'react';

import { Card, CardHeader, CardFooter, CardBody } from 'reactstrap';


const Tweet = ({
    data: {
        title,
        body,
        author: { firstName, lastName },
        published,
    },
}) => (
    <Card style={{ margin: '30px auto', width: '400px' }}>
        <CardHeader>{title}</CardHeader>
        <CardBody>
            {body || <p style={{ opacity: 0.5 }}>This tweet has no body...</p>}
        </CardBody>
        <CardFooter>{`${firstName} ${lastName} - published: ${published}`}</CardFooter>
    </Card>
)

export default Tweet;