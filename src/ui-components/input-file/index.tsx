import React from "react";
import styled from "styled-components";
import { paddingMixin } from "../mixins";
import Sizes, { SizesEnum } from "../../settings/sizes";
import Box from "../box";
import { DoggoListDeprecated, DoggoText } from "../index";
import { DoggoTextVariant } from "../text";
import { useIntl } from "react-intl";
import { isEmpty } from "bme-utils";
import { pipeFileSize } from "../../pipe";

interface Props {
  label?: string;
  errors?: string[];
  onChange: (nextValue: FileList | null) => void;
  multiple?: boolean;
  accept?: string[];
}

const StyledInput = styled.input`
  width: 100%;
  ${paddingMixin({ x: SizesEnum.Large, y: SizesEnum.Medium })};
  margin-bottom: ${Sizes[SizesEnum.Medium]}px;
  color: var(--color-text);
  font-size: 1rem;
  font-family: var(--font-family);
  background: var(--color-background);
  border: 2px solid ${({ theme }) => theme.palette.gray};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.blue};
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25em ${({ theme }) => theme.palette.blue};
  }
`;

const Component: React.FunctionComponent<Props> = ({ label, errors, onChange, multiple, accept }) => {
  const intl = useIntl();
  const [fileList, setFileList] = React.useState<FileList | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileList(event.target.files);
    onChange(event.target.files);
  };

  return (
    <Box padding={{ bottom: SizesEnum.Medium }} column>
      {label && (
        <Box padding={{ bottom: SizesEnum.Medium }}>
          <DoggoText variant={DoggoTextVariant.Callout}>{label}</DoggoText>
        </Box>
      )}
      <StyledInput type="file" onChange={handleChange} multiple={multiple} accept={accept?.join(", ")} />
      <Box padding={{ bottom: SizesEnum.Medium }}>
        <DoggoText color="red" variant={DoggoTextVariant.Caption1}>
          {(errors || []).map((error) => error).join(", ")}
        </DoggoText>
      </Box>
      {fileList && !isEmpty(Array.from(fileList)) && multiple && (
        <DoggoListDeprecated
          label={intl.formatMessage({ id: "common.selected_file_list" })}
          items={Array.from(fileList).map(({ name, size }) => [name, pipeFileSize(size)])}
        />
      )}
    </Box>
  );
};

export default Component;
