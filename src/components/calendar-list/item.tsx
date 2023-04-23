import React from "react";
import { BmeBox, BmeTag, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { CalendarEntry } from "../../services/api/types/calendar/response.type";
import { pipeDateTime } from "../../pipes";
import { Link } from "../../atoms";

const Item: React.FunctionComponent<CalendarEntry> = ({ type, date, title, description, location, pet }) => {
  const intl = useIntl();

  return (
    <BmeBox direction="column" width="100%" padding="sm|md" margin="no|no|sm" border="backgroundSecondary" rounded>
      <BmeBox margin="no|no|sm">
        <BmeBox margin="no|xs|no|no">
          <BmeTag label={intl.formatMessage({ id: `calendar.types.${type}` })} />
        </BmeBox>
        {pet && (
          <Link href={`/app/pet/${pet.id}`}>
            <BmeTag label={pet.name} />
          </Link>
        )}
      </BmeBox>
      <BmeBox direction="column" margin="no|no|xs">
        <BmeText variant="Title2">
          <FormattedMessage id={`common.health_log.kind.${title.toLowerCase()}`} />
        </BmeText>
        <BmeText variant="Subhead">{pipeDateTime(date.start)}</BmeText>
        {description && <BmeText>{description}</BmeText>}
      </BmeBox>
      {location && <BmeText variant="Caption1">{location}</BmeText>}
    </BmeBox>
  );
};

export default Item;
