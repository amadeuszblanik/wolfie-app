import React, { useEffect, useState } from "react";
import Script from "next/script";
import { BmeModal, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, useDeviceName } from "../../hooks";
import { authActions, selectAuthAppleError, selectAuthAppleStatus } from "../../store/auth.slice";
import { Loader } from "../index";

const LOADING_APPLE_INTERVAL = 1000;
const LOADING_APPLE_TIMEOUT = 10000;

interface SignInWithAppleProps {
  short?: boolean;
}

const StyledSignInWithAppleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  #appleid-signin {
    overflow: hidden;
    cursor: pointer;
  }
`;

const Component: React.FC<SignInWithAppleProps> = ({ short }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const storeAuthAppleStatus = useAppSelector(selectAuthAppleStatus);
  const storeAuthAppleError = useAppSelector(selectAuthAppleError);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const isLoader = !isLoaded || isPending;

  const device = useDeviceName();

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;
    let timeout: NodeJS.Timeout | null = null;

    const handleInterval = () => {
      if ("AppleID" in window) {
        setIsLoaded(true);

        if (interval) {
          clearInterval(interval);
        }

        if (timeout) {
          clearTimeout(timeout);
        }
      }
    };

    const handleTimeout = () => {
      setIsError(true);

      if (interval) {
        clearInterval(interval);
      }

      if (timeout) {
        clearTimeout(timeout);
      }
    };

    timeout = setTimeout(handleTimeout, LOADING_APPLE_TIMEOUT);
    interval = setInterval(handleInterval, LOADING_APPLE_INTERVAL);

    return () => {
      if (interval) {
        clearInterval(interval);
      }

      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  useEffect(() => {
    setIsError(storeAuthAppleStatus === "error");
  }, [storeAuthAppleStatus]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    AppleID.auth.init({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
      scope: "name email",
      redirectURI: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI,
      usePopup: true,
    });

    const handleAppleSignInSuccess = (event: Event) => {
      const detail = (event as Event & { detail: AppleSignInDetail }).detail;

      const idToken = detail.authorization.id_token;
      const code = detail.authorization.code;
      const name = detail.user?.name;
      const email = detail.user?.email;

      // @TODO: Temporary solution
      // eslint-disable-next-line no-console
      console.debug(event);

      setIsPending(false);

      dispatch(
        authActions.signInApple({
          idToken,
          code,
          device,
          firstName: name?.firstName,
          lastName: name?.lastName,
          email,
          service: true,
          redirect: "NEXT",
        }),
      );

      void router.push("/app");
    };

    const handleAppleSignInFailure = (event: Event) => {
      // @TODO: Temporary solution
      console.error(event);

      setIsError(true);
      setIsPending(false);
    };

    document.addEventListener("AppleIDSignInOnSuccess", handleAppleSignInSuccess);

    // Listen for authorization failures.
    document.addEventListener("AppleIDSignInOnFailure", handleAppleSignInFailure);

    return () => {
      document.removeEventListener("AppleIDSignInOnSuccess", handleAppleSignInSuccess);
      document.removeEventListener("AppleIDSignInOnFailure", handleAppleSignInFailure);
    };
  }, [isLoaded, router, dispatch, device]);

  return (
    <>
      {isLoader && <Loader />}
      <StyledSignInWithAppleWrapper>
        <div
          id="appleid-signin"
          data-color="black"
          data-border="true"
          data-type="sign in"
          onClick={() => setIsPending(true)}
        ></div>
        {!short && (
          <BmeText variant="LargeTitle">
            <FormattedMessage id="common.component.sign_in_with_apple.or" />
          </BmeText>
        )}
      </StyledSignInWithAppleWrapper>
      {isError && (
        <BmeModal
          onClose={() => {
            setIsError(false);
          }}
        >
          {storeAuthAppleError || <FormattedMessage id="common.component.sign_in_with_apple.error" />}
        </BmeModal>
      )}
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </>
  );
};

export default Component;
