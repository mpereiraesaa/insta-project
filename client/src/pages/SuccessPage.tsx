import React from "react";
import BaseContainer from "../components/BaseContainer";
import { BaseProps } from "../helpers/common";
import styles from '../styles/styles';

export default function SuccessPage(props: BaseProps) {
  return (
    <BaseContainer>
      <header style={styles.container}>
        <p>Your post has been recorded</p>
      </header>
    </BaseContainer>
  );
}

