import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseContainer from "../components/BaseContainer";
import { BaseProps } from "../helpers/common";
import styles from '../styles/styles';

export default function SuccessPage(props: BaseProps) {
  const { isConnected } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [navigate, isConnected])

  return (
    <BaseContainer>
      <header style={styles.container}>
        <p>Your post has been recorded</p>
      </header>
    </BaseContainer>
  );
}

