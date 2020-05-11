import React from 'react';
// import Head from 'next/head';
import { Theme, makeStyles, createStyles, Button, Typography } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Link } from '../../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      position: 'fixed'
    },
    login: {
      margin: 32
    }
  })
);

const Home = () => {
  const classes = useStyles({});

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Carousel showArrows={true} showThumbs={false}>
          <div>
            <img src="/images/logo.png" />
            <Typography variant="h4" gutterBottom>
              视频搬运小工具
            </Typography>
          </div>
          <div>
            <img src="/images/logo.png" />
          </div>
          <div>
            <img src="/images/logo.png" />
          </div>
        </Carousel>
        <Link href="/login" className={classes.login}>
          <Button
            variant="contained"
            color="primary">
            Login
              </Button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Home;
