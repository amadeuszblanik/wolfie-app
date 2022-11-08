import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import Box, { BoxWidth, FlexAlign } from "../box";
import { sizeMixin } from "../mixins";
import { SizesEnum } from "../../settings/sizes";
import Text from "../text";
import Icon from "../icon";

interface StyledStatusProps {
  value: boolean;
}

interface ItemProps {
  valid: boolean;
  label: string;
}

interface Props {
  value: string;
}

const PASSWORD_MIN_LENGTH = 8;

const StyledStatus = styled.div<StyledStatusProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${sizeMixin(SizesEnum.ExtraLarge)};
  height: ${sizeMixin(SizesEnum.ExtraLarge)};
  background: ${({ theme, value }) => (value ? theme.palette.green : theme.palette.red)};
  border-radius: 50%;
`;

const Item: React.FunctionComponent<ItemProps> = ({ valid, label }) => (
  <Box width={BoxWidth.Full}>
    <Box width={BoxWidth.Full} alignY={FlexAlign.Center} padding={{ y: SizesEnum.Medium }}>
      <StyledStatus value={valid}>
        <Icon icon={valid ? "checkmark" : "close"} color="light" />
      </StyledStatus>
      <Box padding={{ left: SizesEnum.Medium }}>
        <Text>
          <FormattedMessage id={label} />
        </Text>
      </Box>
    </Box>
  </Box>
);

const Component: React.FunctionComponent<Props> = ({ value }) => {
  const hasLowercase = /[a-z]/.test(value);
  const hasUppercase = /[A-Z]/.test(value);
  const hasDigit = /[0-9]/.test(value);
  const hasSpecialCharacter = /[#?!@$%^&*-]/.test(value);
  const hasMinLength = value.length >= PASSWORD_MIN_LENGTH;

  const hasAllRequirements = hasLowercase && hasUppercase && hasDigit && hasSpecialCharacter && hasMinLength;

  return hasAllRequirements ? (
    <></>
  ) : (
    <Box column padding={{ x: SizesEnum.Large, y: SizesEnum.Medium }}>
      <Item valid={hasLowercase} label="error.password_lower_letters" />
      <Item valid={hasUppercase} label="error.password_upper_letters" />
      <Item valid={hasDigit} label="error.password_upper_digits" />
      <Item valid={hasSpecialCharacter} label="error.password_upper_special_characters" />
      <Item valid={hasMinLength} label="error.password_length" />
    </Box>
  );
};

export default Component;
