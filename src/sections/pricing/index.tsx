import { BmeBox, BmeButton, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import Image from "next/image";
import { useMobile } from "../../hooks";
import { Link } from "../../atoms";

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
            <FormattedMessage id="section.pricing.title" />
          </BmeText>
        </BmeBox>
        <BmeBox
          direction={isMobile ? "column" : "row"}
          alignY="center"
          width="100%"
          padding="md|no|no"
          margin="no|no|auto"
        >
          <BmeBox direction="column" width={isMobile ? "100%" : "50%"} padding={isMobile ? "sm|md" : "md"}>
            <BmeText>
              <FormattedMessage id="section.pricing.description" />
            </BmeText>
            <BmeBox direction="column" margin="md|no|no">
              <BmeText>
                <FormattedMessage id="section.pricing.donation" />
              </BmeText>
              <BmeBox margin="sm|no|no">
                <Link href="https://revolut.me/blanik">
                  <BmeButton>Revolut</BmeButton>
                </Link>
              </BmeBox>
            </BmeBox>
          </BmeBox>
          <BmeBox width={isMobile ? "100%" : "50%"} padding={isMobile ? "sm|md" : "md"}>
            <StyledPhotoWrapper>
              <Image src="/golden-retriever.jpg" alt="Photo of Golden Retriever" fill />
            </StyledPhotoWrapper>
          </BmeBox>
        </BmeBox>
      </BmeBox>
    </StyledSection>
  );
};

export default Component;
