import { BmeBox, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Image } from "./../../atoms";
import { useMobile } from "../../hooks";

const StyledSection = styled.section`
  white-space: pre-line;
`;

const Component = () => {
  const isMobile = useMobile();

  return (
    <StyledSection id="about">
      <BmeBox direction="column" alignY="center" minHeight="90vh" padding="md|no">
        <BmeBox width="100%" alignX="center" padding="no|no|md" margin="no|no|auto">
          <BmeText variant="Title1" align="center">
            <FormattedMessage id="section.about.title" />
          </BmeText>
        </BmeBox>
        <BmeBox direction={isMobile ? "column" : "row"} alignY="center" padding="md|no|no" margin="no|no|auto">
          <BmeBox width={isMobile ? "100%" : "50%"} padding={isMobile ? "sm|md" : "md"}>
            <Image src="/goldie.jpg" alt="Photo of Standard Schnauzer Goldie" />
          </BmeBox>
          <BmeBox width={isMobile ? "100%" : "50%"} padding={isMobile ? "sm|md" : "md"}>
            <BmeText>
              <FormattedMessage id="section.about.description" />
            </BmeText>
          </BmeBox>
        </BmeBox>
      </BmeBox>
    </StyledSection>
  );
};

export default Component;
