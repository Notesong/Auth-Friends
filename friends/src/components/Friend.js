import React from 'react';

export default function Friend({ name, age, email }) {
    return (
        <div className="friend">
            <h3>{name}</h3>
            <p>{age}</p>
            <p>{email}</p>
        </div>
    )
}