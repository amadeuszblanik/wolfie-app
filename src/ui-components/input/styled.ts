import styled from "styled-components";
import { paddingMixin } from "../mixins";
import Sizes, { SizesEnum } from "../../settings/sizes";

interface StyledInputProps {
  plain?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  ${paddingMixin({ x: SizesEnum.Large, y: SizesEnum.Medium })};
  margin-bottom: ${Sizes[SizesEnum.Medium]}px;
  color: var(--color-text);
  font-size: 1rem;
  font-family: var(--font-family);
  text-align: ${({ plain }) => (plain ? "right" : "left")};
  background: var(--color-background);
  border: ${({ plain, error, theme }) =>
    !plain ? `2px solid ${!error ? theme.palette.gray : theme.palette.red}` : "none"};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.blue};
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25em ${({ theme }) => theme.palette.blue};
  }
`;

export const StyledTextArea = styled.textarea<StyledInputProps>`
  width: 100%;
  ${paddingMixin({ x: SizesEnum.Large, y: SizesEnum.Medium })};
  margin-bottom: ${Sizes[SizesEnum.Medium]}px;
  color: var(--color-text);
  font-size: 1rem;
  font-family: var(--font-family);
  text-align: ${({ plain }) => (plain ? "right" : "left")};
  background: var(--color-background);
  border: ${({ plain, error, theme }) =>
    !plain ? `2px solid ${!error ? theme.palette.gray : theme.palette.red}` : "none"};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.blue};
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25em ${({ theme }) => theme.palette.blue};
  }
`;
