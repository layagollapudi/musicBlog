import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';

import Header from './basic/Header';

const useStyles = makeStyles({
  root: {
    width: '100%',
    spacing: 10,
  },
  card: {
    maxWidth: 500,
  },
  cardMedia: {
    maxHeight: 300,
  },
});

export default function Post() {
  const classes = useStyles();
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setBlogPost(data)
      })
      .catch((error) => { console.error(error) });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Music Musings" />
        {blogPost &&
          <div className={classes.root}>
            <Box mx={5} my={5}>
              <Typography variant="h4" gutterBottom>{blogPost.title}</Typography>
              <Typography variant="subtitle1" gutterBottom>
                <i>{new moment(Date(blogPost.date.$date).toString()).format('YYYY-MM-DD')}</i> by <b>{blogPost.author}</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {blogPost.content}
              </Typography>
            </Box>
          </div>
       }
      </Container>
    </React.Fragment>
  );
}
