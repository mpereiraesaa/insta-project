import React from "react";
import styles from '../styles/styles';
import Button from "../components/Button";
import BaseContainer from "../components/BaseContainer";
import CONFIG from "../helpers/config";

export default function HomePage() {
  const instagramURL = 'https://api.instagram.com/oauth/authorize';
  const query: any = {
    client_id: CONFIG.CLIENT_ID,
    redirect_uri: CONFIG.REDIRECT_URI,
    response_type: 'code',
    scope: 'user_profile,user_media'
  };
  const link = Object
    .keys(query)
    .reduce((acc, next, i) => acc + (i > 0 ? '&' : '') + next + '=' + query[next], '?');
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
