'use client'
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image'

interface UserProfileProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserProfileProps[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();

        const albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
        const albumsData = await albumsResponse.json();

        const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
        const photosData = await photosResponse.json();

        setUsers(usersData);
        setAlbums(albumsData);
        setPhotos(photosData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (userId: number) => {
    setSelectedUser(userId);
    setSelectedAlbum(null); 
  };

  const handleAlbumClick = (albumId: number) => {
    setSelectedAlbum(albumId);
  };

  const userAlbums = albums.filter((album) => album.userId === selectedUser);
  const albumPhotos = photos.filter((photo) => photo.albumId === selectedAlbum);

  return (
    <div>
      <h1 className={styles.title}>Profile Information</h1>
      <ul className={styles.profilecontent}>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user.id)}>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
          </li>
        ))}
      </ul>
      {selectedUser !== null && (
        <div>
          <h2></h2>
          <ul>
            {userAlbums.map((album) => (
              <li key={album.id} onClick={() => handleAlbumClick(album.id)}>
                {album.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedAlbum !== null && (
        <div>
          <h2>Album Photos</h2>
          <ul>
          {albumPhotos.map((photo) => (
          <li key={photo.id}>
            <Image src={photo.url} alt={photo.title} width={300} height={200} />
          </li>
        ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserList;
