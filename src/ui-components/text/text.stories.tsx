/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component, { DoggoTextWeight, Props } from "./index";
import { DoggoTextVariant } from "../text";
import { DoggoBox, DoggoText } from "../index";
import { BoxWidth } from "../box";
import { SizesEnum } from "../../settings/sizes";
import { DefaultTheme } from "styled-components";
import Theme from "../../settings/theme";

type ComponentType = React.FunctionComponent<Props & { sampleText: string }>;

export default {
  title: "UI-Components/Text",
  component: Component,
  argTypes: {
    variant: { options: DoggoTextVariant, control: "select" },
    weight: { options: DoggoTextWeight, control: "select" },
    leading: { control: "boolean" },
    noBottomMargin: { control: "boolean" },
    color: { options: Object.keys(Theme.light.palette), control: "select" },
    sampleText: { control: "text" },
  },
} as ComponentMeta<ComponentType>;

const Template: ComponentStory<ComponentType> = ({ sampleText, ...args }) => (
  <Component {...args}>{sampleText}</Component>
);

const TemplateExample: ComponentStory<ComponentType> = ({ sampleText, ...args }) => (
  <table style={{ margin: "24px auto 24px" }}>
    <thead>
      <tr>
        <th>
          <strong style={{ fontWeight: "bold" }}>Variant</strong>
        </th>
        <th>
          <strong style={{ fontWeight: "bold" }}>Default</strong>
        </th>
        <th>
          <strong style={{ fontWeight: "bold" }}>Leading</strong>
        </th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(DoggoTextVariant).map(([key, value]) => (
        <tr key={key}>
          <td style={{ padding: 8 }}>{key}</td>
          <td style={{ padding: 8 }}>
            <DoggoText {...args} variant={value as DoggoTextVariant}>
              {sampleText}
            </DoggoText>
          </td>
          <td style={{ padding: 8 }}>
            <DoggoText variant={value as DoggoTextVariant} leading={true}>
              {sampleText}
            </DoggoText>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const Playground = Template.bind({});
Playground.args = {
  sampleText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae.",
};

export const Example = TemplateExample.bind({});
Example.args = {
  sampleText: "Lorem ipsum dolor sit amet",
};
