import { BmeBox, bmeMixins, BmeText } from "bme-ui";
import styled from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";
import { Container, Link } from "../../atoms";
import { locales } from "../../settings";

const StyledFooterWrapper = styled.footer`
  ${({ theme }) => bmeMixins.paddings("lg|md|xl", theme)}
  ${({ theme }) => bmeMixins.margins("md|no|no", theme)}
  background: ${({ theme }) => theme.colors.background};
  border-top: 2px solid ${({ theme }) => theme.colors.gray5};
`;

const Component = () => {
  const intl = useIntl();

  return (
    <StyledFooterWrapper>
      <Container>
        <BmeBox direction="column" alignX="center" width="100%">
          <BmeBox margin="no|auto|xs">
            <BmeText variant="Caption1" align="center">
              Wolfie.app &copy; 2022 - {new Date().getFullYear()}
            </BmeText>
          </BmeBox>
          <BmeBox margin="no|auto|xs">
            <BmeText variant="Caption1" align="center">
              <FormattedMessage id="component.footer.made_by" /> <Link href="https://blanik.me">Blanik.me</Link>
            </BmeText>
          </BmeBox>
          <BmeBox margin="no|auto|xs">
            <BmeText variant="Caption1">
              <Link href="/privacy-policy">
                <FormattedMessage id="component.footer.privacy_policy" />
              </Link>
            </BmeText>
          </BmeBox>
          <BmeBox direction="column" alignX="center" margin="no|auto|xs">
            <BmeText variant="Caption1">
              <FormattedMessage id="component.footer.change_language" />
            </BmeText>
            <BmeText variant="Caption1">
              {Object.keys(locales)
                .filter((locale) => locale !== intl.locale)
                .map((locale) => (
                  <Link href={`/${locale}`} key={locale}>
                    <FormattedMessage id={`common.language.${locale.replace(/-/, "_").toLowerCase()}`} />
                  </Link>
                ))}
            </BmeText>
          </BmeBox>
          {/* <BmeText variant="Caption1"> */}
          {/*   <FormattedMessage id="component.footer.cookie_info" /> */}
          {/* </BmeText> */}
        </BmeBox>
      </Container>
    </StyledFooterWrapper>
  );
};

export default Component;
