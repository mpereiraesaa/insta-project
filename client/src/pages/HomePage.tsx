import React from "react";
import styles from '../styles/styles';
import Button from "../components/Button";
import BaseContainer from "../components/BaseContainer";

export default function HomePage() {
  return (
    <BaseContainer>
      <header style={styles.container}>
        <p style={styles.paragraph}>
          <code>Welcome to Instagram project</code>
        </p>
        <Button caption="Connect with Instagram" link="" />
      </header>
    </BaseContainer>
  );
}
