import React from 'react';

export default function Friend({ name, age, email }) {
    return (
        <div className="friend">
            <h3>{name}</h3>
            <p>Age: {age}</p>
            <p>Email: <a className="friend-email" href={`mailto:${email}`}>{email}</a></p>
        </div>
    )
}