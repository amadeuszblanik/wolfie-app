/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component, { Icons } from "./index";
import { SizesEnum } from "../../settings/sizes";
import Theme from "../../settings/theme";

export default {
  title: "UI-Components/Icon",
  component: Component,
  argTypes: {
    icon: { options: Icons, control: "select" },
    size: { options: SizesEnum, control: "select" },
    color: { options: Object.keys(Theme.light.palette), control: "select" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  icon: Icons[0],
  size: SizesEnum.ExtraLarge2,
};
