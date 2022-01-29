import React from 'react';

import { Card, CardHeader, CardBody } from 'reactstrap';

const User = ({
    data: {
        firstName,
        lastName,
        email,
        age,
    },
}) => (
    <Card style={{ margin: '30px auto', width: '400px' }}>
        <CardHeader>{firstName} {lastName}</CardHeader>
        <CardBody>
            <strong>Email:</strong> {email}<br/>
            <strong>Age:</strong> {age}
            {/* {body || <p style={{ opacity: 0.5 }}>This users has no information...</p>} */}
        </CardBody>
    </Card>
)

export default User;