import React from "react";
import { DoggoButton } from "../../ui-components";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

const Component: React.FunctionComponent = () => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    router.push("/");
  };

  return (
    <DoggoButton onClick={handleClick}>
      <FormattedMessage key="change-theme" id="common.sign_off" />
    </DoggoButton>
  );
};
export default Component;
