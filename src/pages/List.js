import React from "react";

const User = ({ userData }) => {
    return (
        <tr>
            <td>{userData.name}</td>
            <td>{userData.email}</td>
        </tr>
    )
}

const UserList = () => {
    const users = [
        { email: 'user1@gmail.com', name: '권지용' },
        { email: 'user2@gmail.com', name: '동영배' },
        { email: 'user3@gmail.com', name: '강대성' },
        { email: 'user4@gmail.com', name: '최승현' }
    ]
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <User userData={user} />)}
            </tbody>
        </table>
    )
}

export default UserList;