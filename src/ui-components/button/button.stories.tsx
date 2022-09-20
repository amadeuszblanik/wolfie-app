import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./index";
import Theme from "../../settings/theme";

export default {
  title: "UI-Components/Button",
  component: Component,
  argTypes: {
    variant: { options: Object.keys(Theme.dark["palette"]), control: "select" },
    disabled: { control: "boolean" },
    onClick: { action: "onClick()" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>Lorem ipsum dolor sit amet.</Component>
);

export const Playground = Template.bind({});
Playground.args = {};
