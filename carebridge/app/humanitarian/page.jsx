import React from 'react'
import styles from "./medical.module.css";
import Link from 'next/link';
const HealthMedical = () => {
  return (
    <div>
        <div>
        <div className={styles.main}>
          <div className={styles.description}>
            <h1>Description</h1>
            <button className={styles.button}>Help Center</button>
          </div>
          <div className={styles.below}>
            <p>Natural disasters and humanitarian crises leave thousands without food, shelter, and medical aid. <br></br>
            Your donation ensures rapid response and recovery efforts for those in need.</p>
          </div>
          <h1 className={styles.description}>How Your Donation Helps</h1>
          <div className={styles.below}>
            <p>$20 provides emergency food and water for a family.</p>
            <p>$100 helps rebuild a home destroyed by floods.</p>
            <p>$250+ supports medical teams responding to disasters.</p>
          </div>
          <h1 className={styles.description}>Impact</h1>
          <div className={styles.below}>
            <p> Thanks to generous donors, we provided emergency relief kits to 5,000 flood victims last year..</p>
          </div>
          <div className={styles.below}>
            <img src="https://images.pexels.com/photos/10629421/pexels-photo-10629421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
          </div>
          <div className={styles.description}>
            <button className={styles.button}>Donate now</button>
            <button className={styles.button}><Link href="/health">See past relief efforts.</Link></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthMedical