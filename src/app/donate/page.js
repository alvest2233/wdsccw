import React from "react";
import styles from "./page.module.css";

export default function Donate() {
  return (
    <div className={styles.donateContainer}>
      <h1 className={styles.donateTitle}>Donate</h1>
      <p className={styles.donateText}>
        Thank you for considering a donation to support our campaign for an affordable, 
        sustainable, and connected London. Your contribution helps us continue our work 
        in the community.
      </p>
      <div className={styles.donateContent}>
        <p>Donation information and form will be added here.</p>
      </div>
    </div>
  );
}
