import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from '../styles/styles';
import Button from "../components/Button";
import BaseContainer from "../components/BaseContainer";
import apiService from "../services/apiService";
import CONFIG from "../helpers/config";

interface IntroDetailsProps {
  link: string;
}

interface IAuthResponse {
  success: boolean;
  message?: string;
}

function IntroDetails({ link }: IntroDetailsProps) {
  return (
    <React.Fragment>
      <p>You have to post using your Instagram account with the following hashtag:</p>
      <p><small><code>#hashtag</code></small></p>
      <Button caption="Launch Instagram" link={link} />
      <cite style={styles.smallCite}>
        We are actively monitoring your account, once your post becomes available the process will finish.
      </cite>
    </React.Fragment>
  )
};

function IntroError() {
  return (
    <React.Fragment>
      <cite style={styles.smallCite}>
        Something went wrong with your authorization request.
      </cite>
    </React.Fragment>
  )
}

export default function IntroPage() {
  const [data, updateData] = useState(null);
  const [hasError, setError] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [queryParams] = useSearchParams();
  const code: string = queryParams.get('code') || '';
  useEffect(() => {
    const authFunction = async () => {
      try {
        const data = await apiService.auth<IAuthResponse>(CONFIG.REDIRECT_URI, code);
        if (!data?.success) {
          setError(true);
        } else {
          setAuthenticated(true);
        }
      } catch (error: any) {
        setError(true);
      }
    }
    authFunction();
  }, [code]);
  React.useEffect(() => {
    if (!isAuthenticated) return;

    const source = new EventSource(CONFIG.BASE_URL + 'find-hashtag', { withCredentials: true });

    source.onmessage = function logEvents(event) {      
      updateData(JSON.parse(event.data));     
    }
  }, [isAuthenticated]);
  return (
    <BaseContainer>
      <header style={styles.container}>
        {!hasError ? <IntroDetails link="a" /> : <IntroError />}
      </header>
    </BaseContainer>
  );
}
