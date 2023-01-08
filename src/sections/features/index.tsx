import { BmeBox, BmeDefaultTheme, BmeIcon, BmeTag, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import React from "react";
import { useMobile } from "../../hooks";

// @TODO: Add proper icon to bme-ui
// @TODO: Add copy to translation file
// @TODO: Add onMouseEnter and onMouseLeave to BmeBox
// @TODO: Add justify for AlignX and AlignY to BmeBox

interface FeatureSingleProps {
  icon: string;
  title: string;
  description: string;
  state: "ready" | "in-progress" | "planned";
  color: keyof typeof BmeDefaultTheme.colors;
  isMobile: boolean;
}

const StyledSection = styled.section`
  white-space: pre-line;
`;

const FeatureSingle: React.FC<FeatureSingleProps> = ({ icon, title, description, state, color, isMobile }) => {
  const intl = useIntl();

  return (
    <BmeBox width={isMobile ? "100%" : "50%"} minHeight="300px" padding="md">
      <BmeBox
        direction="column"
        width="100%"
        minHeight="220px"
        padding={isMobile ? "sm|md" : "md"}
        background="backgroundSecondary"
        border={color}
        rounded
      >
        <BmeBox alignY="bottom" margin="no|no|auto">
          <BmeBox
            alignX="center"
            alignY="center"
            width="80px"
            height="80px"
            margin="no|sm|no|no"
            background={color}
            rounded
          >
            <BmeIcon name={icon} size={48} />
          </BmeBox>
          <BmeBox direction="column">
            <BmeBox margin="no|no|sm">
              <BmeTag
                label={intl.formatMessage({ id: `section.features.state_${state.replace(/-/, "_")}` })}
                variant="gray5"
              />
            </BmeBox>
            <BmeText variant="Headline">
              <FormattedMessage id={title} />
            </BmeText>
          </BmeBox>
        </BmeBox>
        <BmeText>
          <FormattedMessage id={description} />
        </BmeText>
      </BmeBox>
    </BmeBox>
  );
};

const Component = () => {
  const isMobile = useMobile();

  return (
    <StyledSection id="features">
      <BmeBox direction="column" alignY="center" minHeight="90vh" padding="md|no">
        <BmeBox width="100%" alignX="center" padding="no|no|md" margin="no|no|auto">
          <BmeText variant="Title1" align="center">
            <FormattedMessage id="section.features.title" />
          </BmeText>
        </BmeBox>
        <BmeBox direction="row" wrap alignY="center" width="100%" padding="md|no|no" margin="no|no|auto">
          <FeatureSingle
            icon="barbell"
            title="section.features.feature_weight.title"
            description="section.features.feature_weight.description"
            state="ready"
            color="blue"
            isMobile={isMobile}
          />
          <FeatureSingle
            icon="heart"
            title="section.features.feature_health_log.title"
            description="section.features.feature_health_log.description"
            state="ready"
            color="red"
            isMobile={isMobile}
          />
          <FeatureSingle
            icon="medkit"
            title="section.features.feature_heat.title"
            description="section.features.feature_heat.description"
            state="planned"
            color="pink"
            isMobile={isMobile}
          />
          <FeatureSingle
            icon="people"
            title="section.features.feature_share.title"
            description="section.features.feature_share.description"
            state="in-progress"
            color="green"
            isMobile={isMobile}
          />
        </BmeBox>
      </BmeBox>
    </StyledSection>
  );
};

export default Component;
