import { BmeBox, BmeButton, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import Image from "next/image";
import { useMobile } from "../../hooks";
import { Link } from "../../atoms";

// @TODO: Find a good, free or cheap ticketing system and integrate it here

const StyledSection = styled.section`
  white-space: pre-line;
`;

const StyledPhotoWrapper = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 0 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radius}px;
`;

const Component = () => {
  const isMobile = useMobile();

  return (
    <StyledSection id="pricing">
      <BmeBox direction="column" alignY="center" minHeight="90vh" padding="md|no">
        <BmeBox width="100%" alignX="center" padding="no|no|md" margin="no|no|auto">
          <BmeText variant="Title1" align="center">
            <FormattedMessage id="section.contact.title" />
          </BmeText>
        </BmeBox>
        <BmeBox
          direction={isMobile ? "column" : "row"}
          alignY="center"
          width="100%"
          padding="md|no|no"
          margin="no|no|auto"
        >
          <BmeBox width={isMobile ? "100%" : "50%"} padding={isMobile ? "sm|md" : "md"}>
            <StyledPhotoWrapper>
              <Image src="/dog-3.jpg" alt="Photo of Dog" fill />
            </StyledPhotoWrapper>
          </BmeBox>
          <BmeBox direction="column" width={isMobile ? "100%" : "50%"} padding={isMobile ? "sm|md" : "md"}>
            <BmeText>
              <FormattedMessage id="section.contact.description" />
            </BmeText>
            <BmeBox direction="column" margin="sm|no|no">
              <BmeBox margin="no|no|sm">
                <Link href="http://linkedin.com/in/amadeuszblanik/">
                  <BmeButton>LinkedIn</BmeButton>
                </Link>
              </BmeBox>
              <Link href="mailto:amadeusz@blanik.me">
                <BmeButton>Email</BmeButton>
              </Link>
            </BmeBox>
          </BmeBox>
        </BmeBox>
      </BmeBox>
    </StyledSection>
  );
};

export default Component;
