import { BmeBox, BmeButton, BmeText } from "bme-ui";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Image } from "./../../atoms";
import { useMobile } from "../../hooks";
import { Link } from "../../atoms";

const StyledSection = styled.section`
  white-space: pre-line;
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
            <Image src="/golden-retriever.jpg" alt="Photo of Golden Retriever" />
          </BmeBox>
        </BmeBox>
      </BmeBox>
    </StyledSection>
  );
};

export default Component;
