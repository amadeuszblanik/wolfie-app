/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DoggoBox } from "../index";
import { BoxWidth } from "../box";
import { SizesEnum } from "../../settings/sizes";
import Component from "./index";

export default {
  title: "UI-Components/Modal",
  component: Component,
  argTypes: {
    onClose: { action: "onClose()" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>
    <DoggoBox width={BoxWidth.Full} padding={SizesEnum.Large2} background="indigo" />
  </Component>
);

export const Playground = Template.bind({});
Playground.args = {};
