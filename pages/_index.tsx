import React, { useState } from "react";
import { Linkedin, Mail } from "lucide-react";
import styles from "./_index.module.css";

export default function UnderConstructionPage() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className={styles.pageWrapper} onMouseMove={handleMouseMove}>
      <div 
        className={styles.mouseGlow}
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      
      <div className={styles.heroGlow} />
      <div className={styles.heroOrb1} />
      <div className={styles.heroOrb2} />
      <div className={styles.heroOrb3} />

      <main className={styles.content}>
        <div className={styles.header}>
          <span className={styles.logo}>AM.</span>
          <div className={styles.pulseDot} />
        </div>

        <h1 className={styles.heroName}>Alex Mungia</h1>
        <h2 className={styles.subtitle}>Under Construction</h2>
        
        <div className={styles.divider} />
        
        <p className={styles.message}>
          Something great is being built. Check back soon.
        </p>

        <div className={styles.links}>
          <a
            href="mailto:contact@alexmungia.com"
            className={styles.linkButton}
            aria-label="Email"
          >
            <Mail size={18} />
            <span>contact@alexmungia.com</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconButton}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </main>
    </div>
  );
}