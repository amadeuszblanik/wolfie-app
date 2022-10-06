import React, { useEffect } from "react";
import styled from "styled-components";
import { paddingMixin, sizeMixin } from "../mixins";
import { SizesEnum } from "../../settings/sizes";
import Box, { BoxWidth, FlexAlign } from "../box";
import { DoggoText } from "../index";
import { DoggoTextVariant } from "../text";
import { ListItem } from "../../types/list-item.types";
import { isEmpty } from "bme-utils";
import { FormattedMessage } from "react-intl";
import Icon from "../icon";

interface Props {
  value: string | undefined;
  onChange: (nextValue: string | undefined) => void;
  list: ListItem[];
  label?: string;
  plain?: boolean;
  placeholder?: string;
  errors?: string[];
  disabled?: boolean;
}

interface StyledInputProps {
  plain?: boolean;
}

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 200px;
  ${paddingMixin({ y: SizesEnum.Medium })};
  overflow-y: scroll;
  background: var(--color-background);
  border: 2px solid ${({ theme }) => theme.palette.gray};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const StyledDropdownItem = styled.button`
  width: 100%;
  ${paddingMixin({ x: SizesEnum.Large, y: SizesEnum.Medium })};
  text-align: left;
  background: none;
  border: none;
  appearance: none;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
  }
`;

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  ${paddingMixin({
    top: SizesEnum.Medium,
    right: SizesEnum.ExtraLarge,
    bottom: SizesEnum.Medium,
    left: SizesEnum.Large,
  })};
  color: var(--color-text);
  font-size: 1rem;
  font-family: var(--font-family);
  text-align: ${({ plain }) => (plain ? "right" : "left")};
  text-indent: 1px;
  text-overflow: "";
  background: var(--color-background);
  border: ${({ plain, theme }) => (!plain ? `2px solid ${theme.palette.gray}` : "none")};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.blue};
  transition: box-shadow 0.3s ease-in-out;
  appearance: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25em ${({ theme }) => theme.palette.blue};
  }
`;

const StyledSelectIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(calc(-50% - ${sizeMixin(SizesEnum.Small)}));
`;

const Component: React.FunctionComponent<Props> = ({
  value,
  onChange,
  list,
  label,
  placeholder,
  plain,
  errors,
  disabled,
}) => {
  console.error(value);

  const [inputValue, setInputValue] = React.useState<string>(value || "");
  const [inputFocus, setInputFocus] = React.useState<boolean>(false);
  const [dropdownFocus, setDropdownFocus] = React.useState<boolean>(false);

  const itemSelected = list.find(({ label: itemLabel }) => itemLabel === inputValue);
  const dropdownOpen = inputFocus || dropdownFocus;

  const filteredList = list.filter(({ label: itemLabel }) =>
    itemLabel.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleSelectItem = (item: ListItem) => {
    setInputValue(item.label);
    setInputFocus(false);
    setDropdownFocus(false);
  };

  useEffect(() => {
    onChange(itemSelected?.id);
  }, [itemSelected, onChange]);

  return (
    <Box width={plain ? BoxWidth.Full : undefined} padding={{ bottom: SizesEnum.Medium }} column>
      {!plain && label && (
        <Box padding={{ bottom: SizesEnum.Medium }}>
          <DoggoText variant={DoggoTextVariant.Callout}>{label}</DoggoText>
        </Box>
      )}
      <Box padding={{ bottom: SizesEnum.Medium }}>
        <StyledInput
          placeholder={placeholder}
          value={inputValue}
          onChange={({ target: { value: nextValue } }) => setInputValue(nextValue)}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          plain={plain}
          disabled={disabled}
        />
        <StyledSelectIcon>
          <Icon icon={itemSelected ? "checkmark" : "close"} color={itemSelected ? "green" : "red"} />
        </StyledSelectIcon>
        {dropdownOpen && (
          <StyledDropdown
            onMouseEnter={() => setDropdownFocus(true)}
            onMouseLeave={() => setDropdownFocus(false)}
            onTouchStart={() => setDropdownFocus(true)}
          >
            {!isEmpty(filteredList) ? (
              filteredList.map((item) => (
                <StyledDropdownItem key={item.id} onClick={() => handleSelectItem(item)}>
                  <DoggoText>{item.label}</DoggoText>
                </StyledDropdownItem>
              ))
            ) : (
              <Box alignX={FlexAlign.Center}>
                <DoggoText>
                  <FormattedMessage id="error.no_results" />
                </DoggoText>
              </Box>
            )}
          </StyledDropdown>
        )}
      </Box>
      {!plain && (
        <Box padding={{ bottom: SizesEnum.Medium }}>
          <DoggoText color="red" variant={DoggoTextVariant.Caption1}>
            {(errors || []).map((error) => error).join(", ")}
          </DoggoText>
        </Box>
      )}
    </Box>
  );
};

export default Component;