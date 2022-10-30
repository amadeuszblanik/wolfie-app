import React, { useContext, useEffect, useState } from "react";
import { MessagePayload, onMessage } from "@firebase/messaging";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { FirebaseContext, FirebaseContextType } from "../../context/firebase.context";
import { sizeMixin } from "../../ui-components/mixins";
import { SizesEnum } from "../../settings/sizes";
import { DoggoBox, DoggoNotification } from "../../ui-components";

const StyledNotificationWrapper = styled.div`
  position: fixed;
  top: ${sizeMixin(SizesEnum.Large)};
  right: ${sizeMixin(SizesEnum.Large)};
  z-index: 2000;
  width: calc(100% - ${sizeMixin(SizesEnum.Large)} * 2);
  max-width: 420px;
`;

const Component: React.FunctionComponent = () => {
  const intl = useIntl();
  const { messaging } = useContext<FirebaseContextType>(FirebaseContext);
  const [notifications, setNotifications] = useState<MessagePayload[] | null>(null);

  const addNotification = (notification: MessagePayload) => {
    if (notifications) {
      setNotifications([...notifications, notification]);
    } else {
      setNotifications([notification]);
    }
  };

  const removeNotification = (messageIdToRemove: string) => {
    if (notifications) {
      setNotifications(notifications.filter(({ messageId }) => messageId !== messageIdToRemove));
    }
  };

  useEffect(() => {
    if (!messaging) {
      return;
    }

    onMessage(messaging, (payload) => {
      addNotification(payload);
    });
  }, [messaging]);

  if (!notifications) {
    return <></>;
  }

  return (
    <StyledNotificationWrapper>
      {notifications &&
        notifications.map((notification) => (
          <DoggoBox key={notification.messageId} padding={{ bottom: SizesEnum.Medium }}>
            <DoggoNotification
              title={
                notification.notification?.title ??
                intl.formatMessage({ id: "component.firebase.notification.title_default" })
              }
              body={
                notification.notification?.body ??
                intl.formatMessage({ id: "component.firebase.notification.body_default" })
              }
              icon={notification.notification?.icon}
              image={notification.notification?.image}
              onClose={() => removeNotification(notification.messageId)}
            />
          </DoggoBox>
        ))}
    </StyledNotificationWrapper>
  );
};

export default Component;
