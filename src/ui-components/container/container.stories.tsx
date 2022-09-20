import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";
import { DoggoBox } from "../index";
import { BoxWidth } from "../box";
import { SizesEnum } from "../../settings/sizes";

export default {
  title: "UI-Components/Container",
  component: Component,
  argTypes: {
    fullWidth: { control: "boolean" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>
    <DoggoBox width={BoxWidth.Full} padding={SizesEnum.Large2} background="indigo" />
  </Component>
);

export const Playground = Template.bind({});
Playground.args = {};
