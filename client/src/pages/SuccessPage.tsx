import React from "react";
import BaseContainer from "../components/BaseContainer";
import styles from '../styles/styles';

export default function SuccessPage() {
  return (
    <BaseContainer>
      <header style={styles.container}>
        <p>Your post has been recorded</p>
      </header>
    </BaseContainer>
  );
}

