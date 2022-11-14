import React from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { DoggoButton } from "../../ui-components";

const Component: React.FunctionComponent = () => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.dispatchEvent(new Event("authSignIn"));

    router.push("/");
  };

  return (
    <DoggoButton onClick={handleClick}>
      <FormattedMessage key="change-theme" id="common.sign_off" />
    </DoggoButton>
  );
};
export default Component;
