import React from "react";
import { DoggoList, DoggoPlaceholder, DoggoText } from "../../ui-components";

interface Props {
  items?: number;
}

const Component: React.FunctionComponent<Props> = ({ items }) => (
  <>
    {Array(items)
      .fill(null)
      .map((_, index) => (
        <DoggoList.Item key={index}>
          <DoggoText>
            <DoggoPlaceholder />
          </DoggoText>
          <DoggoText>
            <DoggoPlaceholder />
          </DoggoText>
        </DoggoList.Item>
      ))}
  </>
);

Component.defaultProps = {
  items: 6,
};

export default Component;
