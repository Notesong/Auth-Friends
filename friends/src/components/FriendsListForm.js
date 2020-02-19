import React, { useState } from 'react';
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function FriendsListForm({ setFriendsList }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [isLoadingForm, showLoaderForm] = useState(false);
    const [isAddingFriend, showAddingFriend] = useState(false);
    const [formError, setFormError] = useState('');

    const formReset = () => {
        showLoaderForm(false);
        setName('');
        setAge('');
        setEmail('');
    }

    const onSubmit = e => {
        e.preventDefault();
        
        setFormError('');
        showLoaderForm(true);
    
        axiosWithAuth()
            .post("/friends", { name: name, age: parseInt(Math.round(age)), email: email })
            .then(res => {
                setFriendsList(res.data);
                formReset();
            })
            .catch(err => {
                setFormError('Error: Unable to add friend.');
                formReset();
            });
        };
    
      const showFriendForm = e => {
        e.preventDefault()
        showAddingFriend(!isAddingFriend)
    }

    return (
        <div className="friends-list-form">
            {!isAddingFriend ? (
                <button onClick={showFriendForm}>Add a Friend</button>
            ) : (
                <div className="form">
                <button className="x-button" onClick={showFriendForm}>X</button>
                <form className="form friend-form" onSubmit={onSubmit}>
                    {formError && <p className="error">{formError}</p>}
                    <p>Add a Friend</p>
                    <input
                    type="text"
                    placeholder="friend's name"
                    value={name}
                    required
                    onChange={e => setName(e.currentTarget.value)}
                    />
                    <input
                    type="text"
                    placeholder="friend's age"
                    value={age}
                    required
                    onChange={e => setAge(e.currentTarget.value)}
                    />
                    <input
                    type="email"
                    placeholder="friend's email"
                    value={email}
                    required
                    onChange={e => setEmail(e.currentTarget.value)}
                    />
                    <button className="submit" type="submit" disabled={isLoadingForm}>
                    {isLoadingForm ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                </div>
            )}
        </div>
    )
}