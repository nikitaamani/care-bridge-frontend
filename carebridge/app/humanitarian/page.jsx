import React from "react";
import styles from "./medical.module.css";
import Link from "next/link";

const HealthMedical = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        {/* Left: Image */}
        <div className={styles.heroImage}>
          <img
            src="https://images.pexels.com/photos/10629421/pexels-photo-10629421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Medical Aid"
            className={styles.image}
          />
        </div>

        {/* Right: Information */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Providing Medical Aid in Times of Crisis</h1>
          <p className={styles.heroSubtitle}>
            Natural disasters and humanitarian crises leave thousands without food, shelter, and medical aid. Your donation ensures rapid response and recovery efforts for those in need.
          </p>
          <button className={styles.heroButton}>Help Center</button>
        </div>
      </div>

      {/* How Your Donation Helps */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>How Your Donation Helps</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.cardText}>$20 provides emergency food and water for a family.</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardText}>$100 helps rebuild a home destroyed by floods.</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardText}>$250+ supports medical teams responding to disasters.</p>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Impact</h2>
        <p className={styles.impactText}>
          Thanks to generous donors, we provided emergency relief kits to 5,000 flood victims last year.
        </p>
        <img
          src="https://images.pexels.com/photos/10629421/pexels-photo-10629421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Impact"
          className={styles.impactImage}
        />
      </div>

      {/* Call to Action */}
      <div className={styles.cta}>
        <button className={styles.ctaButton}>Donate Now</button>
        <Link href="/health" passHref>
          <button className={styles.ctaButtonOutline}>See Past Relief Efforts</button>
        </Link>
      </div>
    </div>
  );
};

export default HealthMedical;