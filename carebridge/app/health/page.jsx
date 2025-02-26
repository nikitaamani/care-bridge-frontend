import React from "react";
import styles from "./index.module.css";
function HealthCharities() {
  return (
    <div>
      <div>
        <div className={styles.main}>
          <div className={styles.description}>
            <h1>Description</h1>
            <button className={styles.button}>Help Center</button>
          </div>
          <div className={styles.below}>
            <p>Millions of school-going girls in Sub-Saharan Africa struggle with access to sanitary pads, clean water, and hygienic toilets.<br></br> 
            Missing school due to periods affects their education and future opportunities.</p>
          </div>
          <h1 className={styles.description}>How Your Donation Helps</h1>
          <div className={styles.below}>
            <p>$10 provides a month’s supply of sanitary towels for one girl.</p>
            <p>$50 helps build clean toilets in rural schools.</p>
            <p>$100+ contributes to menstrual health education programs.</p>
          </div>
          <h1 className={styles.description}>Succes stories</h1>
          <div className={styles.below}>
            <p> Meet Amina, a 14-year-old girl who now attends school daily thanks to consistent donations providing her with sanitary<br></br>
            pads and hygiene education.</p>
          </div>
          <div className={styles.below}>
            <img src="https://images.pexels.com/photos/19986547/pexels-photo-19986547/free-photo-of-portrait-of-schoolgirl-with-book.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
          </div>
          <div className={styles.description}>
            <button className={styles.button}>Donate now</button>
            <button className={styles.button}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthCharities;
