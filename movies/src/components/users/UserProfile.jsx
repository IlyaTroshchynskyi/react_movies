import React from 'react';


const UserProfile = (props) => {
    const {username, first_name: firstName, last_name: lastName} = props.userData
    return (
        <>
            <div>
                {username}
            </div>
            <div>
                {firstName}
            </div>
            <div>
                {lastName}
            </div>
        </>
    )
}

export default UserProfile
