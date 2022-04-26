import React from "react";
import styles from '../styles/styles';
import Button from "../components/Button";

export default function HomePage() {
  return (
    <div style={styles.page}>
    <header style={styles.container}>
      <p style={styles.paragraph}>
        <code>Welcome to Instagram project</code>
      </p>
      <Button caption="Connect with Instagram" link="" />
    </header>
  </div>
  );
}
