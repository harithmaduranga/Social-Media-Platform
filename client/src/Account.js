import React, { useState, useEffect } from 'react';
import { Typography, Container, CssBaseline, Link, Grid, Paper, CardMedia, Avatar } from '@mui/material';
import axios from 'axios';

const MyAccountPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [followerDetails, setFollowerDetails] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem('current_user'));
    setCurrentUser(storedUser);
  }, []);

  useEffect(() => {
    if (currentUser) {
      // Fetch details of each follower
      Promise.all(currentUser.followers.map(followerId =>
        axios.get(`http://localhost:8000/users/${followerId}`)
      ))
      .then(response => {
        const followerData = response.map(res => res.data);
        setFollowerDetails(followerData);
      })
      .catch(error => {
        console.error('Error fetching follower details:', error);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      // Fetch details of each follower
      Promise.all(currentUser.posts.map(postId =>
        axios.get(`http://localhost:8000/posts/${postId}`)
      ))
      .then(response => {
        const postData = response.map(res => res.data);
        setUserPosts(postData);
      })
      .catch(error => {
        console.error('Error fetching follower details:', error);
      });
    }
  }, [currentUser]);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            {currentUser && (
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                {currentUser.image && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <CardMedia
                      component="img"
                      src={require("." + currentUser.image.replace("/client/src", ""))}
                      alt="User"
                      style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '10px' }}>{currentUser.name}</Typography>
                <Typography variant="body1">City: {currentUser.city}</Typography>
                <Typography variant="body1">Country: {currentUser.country}</Typography>
                <Typography variant="body1">Email: {currentUser.email}</Typography>
              </div>
            )}
            <div>
              <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>Followers:</Typography>
              {followerDetails.map(follower => (
                <div key={follower.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {follower.image && (
                    <Avatar src={require("." + follower.image.replace("/client/src", ""))} alt={follower.name} style={{ marginRight: '10px' }} />
                  )}
                  <Typography key={follower.id} variant="body1">
                    <Link href={`/user/${follower.id}`} color="primary">
                      {follower.name}
                    </Link>
                  </Typography>
                </div>
              ))}
            </div>
          </Paper>
        </Grid>
        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '20px' }}>My Posts</Typography>
            {userPosts.map(post => (
              <div key={post.id} style={{ marginBottom: '10px' }}>
                {post.image && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '50px' }}>
                    <CardMedia
                      component="img"
                      src={require("." + post.image.replace("/client/src", ""))} // Update this path to your image
                      alt="Post"
                    />
                  </div>
                )}
                <Link href={`/post/${post.id}`} color="primary">{post.title}</Link>
                <Typography variant="body2" color="textSecondary">{post.body}</Typography>
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyAccountPage;
