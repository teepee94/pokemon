import React from 'react'
import "../../resources/sass/components/_components.profile.scss"

function Profile(c) {
    return (
        <div className={`c-profile ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <h1>Profile component will go here</h1>
                </div>
            </div>
        </div>
    )
}

export default Profile