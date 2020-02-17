import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Friend from './Friend';
import FriendsListForm from './FriendsListForm';

export default function FriendsList() {
  const [friendsList, setFriendsList] = useState([]);
  const [isLoadingList, showLoaderList] = useState(false);
  const [listError, setListError] = useState('');

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

  return (
    <div className="friends-list-component">
      <h2>Your Friends List</h2>
      <div className="friends-form-container">
        <FriendsListForm setFriendsList={setFriendsList} />
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