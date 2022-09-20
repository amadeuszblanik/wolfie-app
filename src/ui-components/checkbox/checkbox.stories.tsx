import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Checkbox",
  component: Component,
  argTypes: {
    value: { control: "boolean" },
    onChange: { action: "onChange()" },
    label: { defaultValue: "Lorem ipsum dolor sit amet", control: "text" },
    errors: { defaultValue: ["Lorem ipsum dolor sit amet"], control: "array" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>Lorem ipsum dolor sit amet.</Component>
);

export const Playground = Template.bind({});
Playground.args = {};
