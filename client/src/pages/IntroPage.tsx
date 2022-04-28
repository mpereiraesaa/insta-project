import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from '../styles/styles';
import Button from "../components/Button";
import BaseContainer from "../components/BaseContainer";
import apiService from "../services/apiService";
import { BaseProps } from "../helpers/common";

const { REACT_APP_REDIRECT_URI, REACT_APP_BASE_URL, REACT_APP_HASHTAG } = process.env;

interface Props extends BaseProps {
  setConnection: Dispatch<SetStateAction<boolean>>;
}

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
      <p><small><code>#{REACT_APP_HASHTAG}</code></small></p>
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

export default function IntroPage(props: Props) {
  const { isConnected, setConnection } = props;
  const [isListening, setListening] = useState(false);
  const [hasError, setError] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const navigation = useNavigate();
  const [queryParams] = useSearchParams();
  const code: string = queryParams.get('code') || '';
  useEffect(() => {
    const authFunction = async () => {
      try {
        const data = await apiService.auth<IAuthResponse>(REACT_APP_REDIRECT_URI, code);
        if (!data?.success) {
          setError(true);
        } else {
          setAuthenticated(true);
          setConnection(true);
        }
      } catch (error: any) {
        setError(true);
      }
    }
    if (!!code && !isConnected) {
      authFunction();
    }
  }, [code, isConnected]);
  useEffect(() => {
    if ((!isAuthenticated && !isConnected) || isListening) return;

    const source = new EventSource(REACT_APP_BASE_URL + 'find-hashtag', { withCredentials: true });

    source.onmessage = function logEvents(event) {
      const data: any = JSON.parse(event.data);
      if (data.success) {
        source.close();
        navigation("/success");
      }
    }

    setListening(true);
  }, [isAuthenticated, isConnected, navigation]);
  return (
    <BaseContainer>
      <header style={styles.container}>
        {!hasError ? <IntroDetails link="a" /> : <IntroError />}
      </header>
    </BaseContainer>
  );
}
