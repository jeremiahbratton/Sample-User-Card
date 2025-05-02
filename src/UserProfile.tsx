import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface RandomUser {
  results: Array<{
    name: {
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string;
    };
  }>;
}

interface UserProfileProps {
  userId: number;
  onError?: (error: Error) => void;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const useUserData = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      // Check localStorage first
      const storedData = localStorage.getItem(`user_${userId}`);
      if (storedData) {
        const parsedData: UserData = JSON.parse(storedData);
        // Only fetch from API if name or email is empty
        if (parsedData.name && parsedData.email) {
          return parsedData;
        }
      }

      // Fetch from API if no stored data or empty fields
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: RandomUser = await response.json();
      const user = data.results[0];
      const userData = {
        id: userId,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        avatar: user.picture.large
      };

      // Store in localStorage
      localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
      return userData;
    },
    retry: 1,
  });
};

const UserProfile: React.FC<UserProfileProps> = ({ userId, onError }) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading, error } = useUserData(userId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    if (error && onError) {
      onError(error as Error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (user) {
      setEditedName(user.name);
      setEditedEmail(user.email);
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: editedName,
        email: editedEmail
      };
      localStorage.setItem(`user_${userId}`, JSON.stringify(updatedUser));
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(user?.name || '');
    setEditedEmail(user?.email || '');
    queryClient.invalidateQueries({ queryKey: ['user', userId] });
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        Failed to load user profile
      </div>
    );
  }

  return (
    <section className="user-profile">
      <div className="user-profile-header">
        <img
          src={user?.avatar}
          alt={`${user?.name}'s avatar`}
          className="user-avatar"
        />
        <div className="user-info">
          {isEditing ? (
            <>
              <p className="identity-theft-message">
                Does this person look kinda like you? Put in your name and email to jealously preserve their likeness as your own.
              </p>
              <div className="edit-input-container">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="edit-input"
                  placeholder="Enter name"
                /></div>
              <div className="edit-input-container">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="edit-input"
                  placeholder="Enter email"
                />
              </div>
            </>
          ) : (
            <>
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
            </>
          )}
        </div>
      </div>

      <div className="button-group">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="save-button"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
            <p className="edit-note">
              If you blank out name and email, we will fetch a new person for you to pretend to be.
            </p>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="edit-button"
          >
            Edit Profile
          </button>
        )}
      </div>
    </section >
  );
};

export default UserProfile; 