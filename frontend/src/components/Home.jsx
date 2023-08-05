import React from 'react';
import styles from '../styles.module.css';
import projLogoVideo from '../videos/proj_logo.mp4';
import projectLogoVideo from '../videos/project_logo.mp4';
import catImage from '../background/cat.png';
import { Link } from 'react-router-dom';


const Home = () => {
  
  return (
    <div className={styles.topContainer}>
      <video id="bg-video" autoPlay loop muted>
        <source src={projectLogoVideo} type="video/mp4" />
      </video>
      <div className={styles.login}>
        <Link className={styles.logbtn} to="/login">
          Login
        </Link>
      </div>
      <div className={styles.info}>
        <h2>The Next-Gen Image Insight Generation</h2>
        <div className={styles.description}>
        <img className={styles.cat} src={catImage} alt="Cat" />
          <h3>
            Let our AI do the talking! Generate captions for your images in
            seconds....
          </h3>
          <h3>So come, upload your images and listen to them come to life</h3>
        </div>
        <div className={styles.getStarted}>
          <Link className={styles.btn} to="/upload">
            Get Started!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
