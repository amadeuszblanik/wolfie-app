import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { toRgba } from "bme-utils";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoIcon, DoggoText } from "../../ui-components";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { SizesEnum } from "../../settings/sizes";
import { DoggoTextVariant } from "../../ui-components/text";
import { DoggoIcons } from "../../ui-components/icon";
import { ButtonSizes } from "../../ui-components/button";

interface ItemProps {
  active: boolean;
  icon: DoggoIcons;
  name: string;
}

const StyledBottomBar = styled(DoggoBox)`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1090;

  @supports (backdrop-filter: blur(20px)) {
    background: ${({ theme }) => toRgba(theme.palette.backgroundSecondary, theme.opacity.navigation)};
    backdrop-filter: blur(20px);
    --color-background: transparent;
  }
`;

const Item = ({ active, icon, name }: ItemProps) => (
  <DoggoButton size={ButtonSizes.Small}>
    <DoggoBox alignX={FlexAlign.Center} column>
      <DoggoBox padding={{ bottom: SizesEnum.Small }}>
        <DoggoIcon icon={icon} size={SizesEnum.Large2} color={active ? "blue" : undefined} />
      </DoggoBox>
      <DoggoText variant={DoggoTextVariant.Caption2} noBottomMargin uppercase color={active ? "blue" : undefined}>
        {name}
      </DoggoText>
    </DoggoBox>
  </DoggoButton>
);

const Component = () => {
  const router = useRouter();
  const intl = useIntl();
  const { pathname } = router;

  return (
    <StyledBottomBar
      alignX={FlexAlign.Center}
      alignY={FlexAlign.Center}
      width={BoxWidth.Full}
      padding={{ y: SizesEnum.Medium }}
      background="backgroundSecondary"
    >
      <DoggoContainer fullWidth>
        <DoggoBox alignX={FlexAlign.SpaceBetween} width={BoxWidth.Full}>
          <Link href="/app">
            <a>
              <Item
                icon="apps"
                name={intl.formatMessage({ id: "component.bottom_bar.pets" })}
                active={pathname.startsWith("/app")}
              />
            </a>
          </Link>
          <Link href="/settings">
            <a>
              <Item
                icon="cog"
                name={intl.formatMessage({ id: "component.bottom_bar.settings" })}
                active={pathname.startsWith("/settings")}
              />
            </a>
          </Link>
        </DoggoBox>
      </DoggoContainer>
    </StyledBottomBar>
  );
};

export default Component;
