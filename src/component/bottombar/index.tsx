import styled from "styled-components";
import { DoggoBox, DoggoButton, DoggoContainer, DoggoIcon, DoggoText } from "../../ui-components";
import { BoxWidth, FlexAlign } from "../../ui-components/box";
import { SizesEnum } from "../../settings/sizes";
import { DoggoTextVariant } from "../../ui-components/text";

const StyledBottomBar = styled(DoggoBox)`
  position: fixed;
  bottom: 0;
  left: 0;
`;

const Item = () => (
  // eslint-disable-next-line no-console
  <DoggoButton onClick={() => console.debug("Button clicked")} variant="blue">
    <DoggoBox alignX={FlexAlign.Center} column>
      <DoggoBox padding={{ bottom: SizesEnum.Small }}>
        <DoggoIcon icon="close-circle" size={SizesEnum.Large2} />
      </DoggoBox>
      <DoggoText variant={DoggoTextVariant.Caption2} noBottomMargin>
        Pets
      </DoggoText>
    </DoggoBox>
  </DoggoButton>
);

const Component = () => {
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
          <Item />
          <Item />
          <Item />
          <Item />
        </DoggoBox>
      </DoggoContainer>
    </StyledBottomBar>
  );
};

export default Component;
