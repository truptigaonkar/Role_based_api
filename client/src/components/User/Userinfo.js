import React from 'react'

const Userinfo = (props) => {
    const {profileData} = props
    return (
        <div>
            <p><b>Id: </b>{profileData._id}</p>
                <p><b>Username: </b>{profileData.username}</p>
                <p><b>Name: </b>{profileData.name}</p>
                <p><b>Email: </b>{profileData.email}</p>
                <p><b>Created at: </b>{profileData.createdAt}</p>
                <p><b>Updated at: </b>{profileData.updatedAt}</p>
        </div>
    )
}

export default Userinfo;
