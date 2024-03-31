import React, { useState, useEffect } from 'react';
import { Typography, Container, CssBaseline, Link, Button, Grid, Paper, Avatar, CardMedia } from '@mui/material';
import axios from 'axios';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch users
    axios.get('http://localhost:8000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Fetch posts
    axios.get('http://localhost:8000/posts')
      .then(response => {
        setPosts(response.data.reverse()); // Reverse to display latest posts first
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

    // Retrieve current user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem('current_user'));
    setCurrentUser(storedUser);

  }, []);

  const updateCurrentUser = ()=>{
    if (currentUser) {
      // Define the URL for the PUT request
      const url = `http://localhost:8000/users/${currentUser.id}`;

      // Define the new details for the user
      const newDetails = {
        id: currentUser.id,
        name: currentUser.name,
        image: currentUser.image,
        city: currentUser.city,
        country: currentUser.country,
        email: currentUser.email,
        password: currentUser.password,
        followers: currentUser.followers,
        following: currentUser.following,
        posts: currentUser.posts,
        liked: currentUser.liked
      };

      console.log(newDetails);

      // Make the PUT request to update the user
      axios.put(url, newDetails)
        .then(response => {
          console.log('User updated successfully:', response.data);
          // Handle success if needed
        })
        .catch(error => {
          console.error('Error updating user:', error);
          // Handle error if needed
        });
    }
  }

  const followUser = (user_id) =>{
    let user;
    axios.get(`http://localhost:8000/users/${user_id}`)
      .then(response => {
        user = response.data;
      })
      .then(()=>{
        user.followers.push(currentUser.id);
        console.log(user);
        currentUser.following.push(user.id);
        console.log(currentUser);
      })
      .then(()=>{
        axios.put(`http://localhost:8000/users/${user_id}`,user);
      })
      .then(()=>{
        updateCurrentUser();
      })
      .then(response => {
        console.log('User updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating the user:', error);
      });
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {/* Users Section */}
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Users</Typography>
      <Grid container spacing={4}>
        {users.map(user => { if(user.id !== currentUser.id) return(
          <Grid item xs={12} sm={6} md={3} key={user.id}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Avatar src={require("." + user.image.replace("/client/src", ""))} alt={user.name} style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
              <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                <Link href={`/user/${user.id}`} color="primary">
                  {user.name}
                </Link>
              </Typography>
              {currentUser.following && currentUser.following.includes(user.id) ? (
                  <p>Following</p>
              ):(
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }}
                  onClick={()=>followUser(user.id)}
                >
                  Follow
                </Button>
              )}
            </Paper>
          </Grid>
        )})}
      </Grid>
      {/* Posts Section */}
      <Typography variant="h4" style={{ marginTop: '40px', marginBottom: '20px' }}>Posts</Typography>
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={3} key={post.id}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                {post.image && (
                <CardMedia
                    component="img"
                    src={require("." + post.image.replace("/client/src", ""))} // Update this path to your image
                    alt="Post"
                />
                )}
                <Link href={`/post/${post.id}`} color="primary">
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        {post.title}
                    </Typography>
                </Link>
              <Typography variant="body1">
                {post.body}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
