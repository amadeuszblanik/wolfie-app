import React from "react";
import { BmeBox, BmeButton, BmeIcon, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";

interface ErrorMessagesProps {
  messages: string[];
  onTryAgain?: () => void;
}

const Component: React.FC<ErrorMessagesProps> = ({ messages, onTryAgain }) => (
  <BmeBox
    direction="column"
    alignX="center"
    alignY="center"
    padding="sm|md"
    background="backgroundSecondary"
    border="red"
    rounded
  >
    <BmeBox margin="no|no|md">
      <BmeIcon name="close-circle" size={120} />
    </BmeBox>
    <BmeText variant="LargeTitle">
      <FormattedMessage id="component.error_message.title" />
    </BmeText>
    {messages.map((message) => (
      <BmeText key={message} variant="Title2">
        {message}
      </BmeText>
    ))}
    {onTryAgain && (
      <BmeBox margin="md|no|no">
        <BmeButton onClick={onTryAgain}>
          <FormattedMessage id="component.error_message.try_again" />
        </BmeButton>
      </BmeBox>
    )}
  </BmeBox>
);

export default Component;
