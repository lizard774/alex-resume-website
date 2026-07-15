import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./$.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      
      <div className={styles.heroGlow} />
      <div className={styles.heroOrb1} />
      <div className={styles.heroOrb2} />
      <div className={styles.heroOrb3} />

      <main className={styles.content}>
        <div className={styles.header}>
          <span className={styles.logo}>AM.</span>
          <div className={styles.pulseDot} />
        </div>

        <h1 className={styles.heroName}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        
        <div className={styles.divider} />
        
        <p className={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.links}>
          <Link to="/" className={styles.linkButton}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}