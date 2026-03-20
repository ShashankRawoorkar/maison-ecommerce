import React, { useState } from 'react';
import { subscribeNewsletter } from '../../../../services/api.js';
import { useToast } from '../../../../hooks/useToast.js';
import styles from './NewsletterSection.module.css';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await subscribeNewsletter(email.trim());
      showToast('Welcome to the Maison Circle!');
      setEmail('');
    } catch (err) {
      showToast('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.newsletterLeft}>
        <div className={styles.sectionEyebrow}>Stay in the Know</div>
        <h2 className={styles.newsletterTitle}>
          Join the<br /><em>Maison Circle</em>
        </h2>
        <p className={styles.newsletterSub}>
          Get early access to new arrivals, exclusive offers, and curated style guides delivered to your inbox.
        </p>
      </div>

      <div className={styles.newsletterRight}>
        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
          <input
            className={styles.newsletterInput}
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className={styles.newsletterSubmit}
            type="submit"
            disabled={loading}
          >
            {loading ? '...' : 'Subscribe'}
          </button>
        </form>
        <p className={styles.newsletterDisclaimer}>
          By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
