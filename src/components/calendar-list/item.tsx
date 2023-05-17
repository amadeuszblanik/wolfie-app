import React from "react";
import { BmeBox, BmeTag, BmeText } from "bme-ui";
import { useIntl } from "react-intl";
import Icon from "bme-ui/dist/atoms/icon";
import { pipeDateTime } from "../../pipes";
import { Link } from "../../atoms";
import { CalendarDao } from "../../services/api/types/calendar.type";

const Item: React.FunctionComponent<CalendarDao> = ({ date, title, description, location, contact, pet, elements }) => {
  const intl = useIntl();

  return (
    <BmeBox direction="column" width="100%" padding="sm|md" margin="no|no|sm" border="backgroundSecondary" rounded>
      <BmeBox margin="no|no|sm">
        {elements.map(({ id, kind }) => (
          <BmeBox key={id} margin="no|xs|no|no">
            <BmeTag label={intl.formatMessage({ id: `calendar.types.${kind}` })} />
          </BmeBox>
        ))}
        {pet && (
          <Link href={`/app/pet/${pet.id}`}>
            <BmeTag label={pet.name} />
          </Link>
        )}
      </BmeBox>
      <BmeBox direction="column" margin="no|no|xs">
        <BmeText variant="Title2">{title}</BmeText>
        <BmeText variant="Subhead">{pipeDateTime(date.start)}</BmeText>
      </BmeBox>
      <BmeBox direction="column" margin="no|no|xs">
        {description && <BmeText>{description}</BmeText>}
      </BmeBox>
      {location && (
        <BmeBox alignY="center" margin="no|no|xs">
          <BmeBox alignY="center">
            <BmeBox inline margin="no|xs|no|no">
              <Icon name="location-outline" />
            </BmeBox>
            <BmeText variant="Caption1">{location.formatted}</BmeText>
          </BmeBox>
        </BmeBox>
      )}
      {contact?.email && (
        <BmeBox margin="no|no|xs">
          <Link href={`mailto:${contact.email}`}>
            <BmeBox alignY="center">
              <BmeBox inline margin="no|xs|no|no">
                <Icon name="mail-outline" />
              </BmeBox>
              <BmeText variant="Caption1">{contact.email}</BmeText>
            </BmeBox>
          </Link>
        </BmeBox>
      )}
      {contact?.phoneNumber && (
        <BmeBox margin="no|no|xs">
          <Link href={`tel:${contact.phoneNumber}`}>
            <BmeBox alignY="center">
              <BmeBox inline margin="no|xs|no|no">
                <Icon name="call-outline" />
              </BmeBox>
              <BmeText variant="Caption1">{contact.phoneNumber}</BmeText>
            </BmeBox>
          </Link>
        </BmeBox>
      )}
    </BmeBox>
  );
};

export default Item;
