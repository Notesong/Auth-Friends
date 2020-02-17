import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Friend from './Friend';

export default function FriendsList() {
  const [friendsList, setFriendsList] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [isLoadingForm, showLoaderForm] = useState(false);
  const [isLoadingList, showLoaderList] = useState(false);
  const [isAddingFriend, showAddingFriend] = useState(false);
  const [formError, setFormError] = useState('');
  const [listError, setListError] = useState('');

  const formReset = () => {
    showLoaderForm(false);
    setName('');
    setAge('');
    setEmail('');
  }

  useEffect(() => {
    setListError('');
    showLoaderList(true);

    const getFriendsList = async () => {
      await axiosWithAuth()
        .get("/friends")
        .then(res => {
          setFriendsList(res.data);
        })
        .catch(err => {
          setListError('Error: Unable get friends list.');
        });
    };
    getFriendsList();
    showLoaderList(false);
  }, []);

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
    <div className="friends-list-component">
      <h2>Your Friends List</h2>
      <div className="friends-form-container">
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
      <div className="friends-list">
        {listError && <p className="error">{listError}</p>}
        <>
          {isLoadingList ? (
            <Loader
              type="ThreeDots"
              color="#555555"
              height={30}
              width={100}
              timeout={3000} //3 secs
            />
          ) : (
            <>
              {friendsList.map(friend => (
                <Friend 
                  key={friend.id}
                  name={friend.name}
                  age={friend.age}
                  email={friend.email}
                />
              ))}
            </>
          )}
        </>
      </div>
    </div>
  );
}