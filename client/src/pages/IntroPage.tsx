import React from "react";
import styles from '../styles/styles';
import Button from "../components/Button";

export default function IntroPage() {
  return (
    <div style={styles.page}>
    <header style={styles.container}>
      <p>You have to post using your Instagram account with the following hashtag:</p>
      <p style={styles.paragraph}><small><code>#hashtag</code></small></p>
      <Button caption="Launch Instagram" link="" />
      <cite style={styles.smallCite}>
        We are actively monitoring your account, once your post becomes available the process will finish.
      </cite>
    </header>
  </div>
  );
}

