import React, { useEffect, useState } from "react";
import Script from "next/script";
import { BmeModal, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useAppDispatch, useAppSelector, useDeviceName } from "../../hooks";
import { authActions, selectAuthAppleError, selectAuthAppleStatus } from "../../store/auth.slice";

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
  const dispatch = useAppDispatch();
  const storeAuthAppleStatus = useAppSelector(selectAuthAppleStatus);
  const storeAuthAppleError = useAppSelector(selectAuthAppleError);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const device = useDeviceName();

  useEffect(() => {
    setIsError(storeAuthAppleStatus === "error");
  }, [storeAuthAppleStatus]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    AppleID.auth.init({
      clientId: "me.blanik.Wolfie.Api",
      scope: "name email",
      redirectURI: "https://test.wolfie.app/auth/apple",
      usePopup: true,
    });

    document.addEventListener("AppleIDSignInOnSuccess", (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const detail = event.detail as AppleSignInDetail;

      const idToken = detail.authorization.id_token;
      const code = detail.authorization.code;
      const name = detail.user?.name;
      const email = detail.user?.email;

      // @TODO: Temporary solution
      // eslint-disable-next-line no-console
      console.debug(event);

      dispatch(
        authActions.signInApple({
          idToken,
          code,
          device,
          firstName: name?.firstName,
          lastName: name?.lastName,
          email,
        }),
      );
    });

    // Listen for authorization failures.
    document.addEventListener("AppleIDSignInOnFailure", (event) => {
      // @TODO: Temporary solution
      console.error(event);

      setIsError(true);
    });
  }, [isLoaded]);

  return (
    <>
      <StyledSignInWithAppleWrapper>
        <div id="appleid-signin" data-color="black" data-border="true" data-type="sign in"></div>
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
