import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Form",
  component: Component,
  argTypes: {
    label: { control: "text" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>Lorem ipsum dolor sit amet.</Component>
);

export const Playground = Template.bind({});
Playground.args = {
  label: "Lorem ipsum dolor sit amet",
};
