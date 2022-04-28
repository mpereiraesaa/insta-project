import React, { useEffect } from "react";
import styles from '../styles/styles';
import Button from "../components/Button";
import BaseContainer from "../components/BaseContainer";
import { BaseProps } from "../helpers/common";
import { useNavigate } from "react-router-dom";

const { REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI } = process.env;

export default function HomePage(props: BaseProps) {
  const { isConnected } = props;
  const navigation = useNavigate();
  const instagramURL = 'https://api.instagram.com/oauth/authorize';
  const query: any = {
    client_id: REACT_APP_CLIENT_ID,
    redirect_uri: REACT_APP_REDIRECT_URI,
    response_type: 'code',
    scope: 'user_profile,user_media'
  };
  const link = Object
    .keys(query)
    .reduce((acc, next, i) => acc + (i > 0 ? '&' : '') + next + '=' + query[next], '?');

  useEffect(() => {
    if (isConnected) {
      navigation("/intro");
    }
  }, [isConnected, navigation]);

  return (
    <BaseContainer>
      <header style={styles.container}>
        <p style={styles.paragraph}>
          <code>Welcome to Instagram project</code>
        </p>
        <Button caption="Connect with Instagram" link={instagramURL + link} />
      </header>
    </BaseContainer>
  );
}
