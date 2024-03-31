import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, CssBaseline, Link, CardMedia, Button, Grid, Avatar, Paper } from '@mui/material';
import axios from 'axios';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/posts/${id}`)
      .then(response => {
        setPost(response.data);
        setLikes(response.data.likes);
        Promise.all(response.data.comments.map(commentId =>
          axios.get(`http://localhost:8000/comments/${commentId}`)
        ))
        .then(commentResponses => {
          const fetchedComments = commentResponses.map(commentResponse => commentResponse.data);
          setComments(fetchedComments);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
      });
  }, [id]);

  useEffect(() => {
    if (likes.length > 0) {
      Promise.all(likes.map(userId =>
        axios.get(`http://localhost:8000/users/${userId}`)
      ))
      .then(response => {
        const likedUsers = response.map(res => res.data);
        setLikes(likedUsers);
      })
      .catch(error => {
        console.error('Error fetching liked users:', error);
      });
    }
  }, [likes]);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            {post && (
              <>
                <Typography variant="h4">{post.title}</Typography>
                {post.image && (
                  <CardMedia
                    component="img"
                    src={require("." + post.image.replace("/client/src", ""))}
                    alt="Post"
                    style={{ maxWidth: '100%', marginBottom: '20px' }}
                  />
                )}
                <Typography variant="body1">{post.body}</Typography>
                <Typography variant="body2">Author: <Link href={`/user/${post.author_id}`}>{post.author}</Link></Typography>
                <Typography variant="body2">Date: {post.date_time}</Typography>
                <div style={{display:'flex'}}>
                  <Button variant="contained" color="primary" style={{ marginTop: '20px', marginRight:'30px' }}>Like</Button>
                  <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>Comment</Button>
                </div>
                <Typography variant="body2" style={{ marginTop: '10px' }}>Total Likes: {likes.length}</Typography>
                <Typography variant="body2" style={{ marginTop: '10px' }}>Liked By:</Typography>
                {likes && likes.map(user => (
                  <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                    {user.image && <Avatar src={require("." + user.image.replace("/client/src", ""))} alt={user.name} style={{ marginRight: '10px' }} />}
                    <Typography variant="body2">
                      <Link href={`/user/${user.id}`}>{user.name}</Link>
                    </Typography>
                  </div>
                ))}
              </>
            )}
          </Paper>
        </Grid>
        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" style={{ marginBottom: '20px' }}>Comments</Typography>
            {comments.map(comment => (
              <div key={comment.id} style={{ marginBottom: '20px' }}>
                <Typography variant="body1">{comment.body}</Typography>
                <Typography variant="body2">Author: <Link href={`/user/${comment.author_id}`}>{comment.author}</Link></Typography>
                <Typography variant="body2">Likes: {comment.likes.length}</Typography>
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostPage;
