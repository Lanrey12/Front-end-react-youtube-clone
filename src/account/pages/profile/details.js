import React from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '../../../redux/actions/userActions';

function Details() {
   
    const user = accountService.userValue;

    return (
        <div>
            <h1>My Profile</h1>
            <p>
                <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                <strong>Email: </strong> {user.email}
            </p>
            <p><Link to="/profile/update">Update Profile</Link></p>
        </div>
    );
}

export { Details };