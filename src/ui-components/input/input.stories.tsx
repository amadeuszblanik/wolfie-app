/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component, { InputTypes } from "./index";

export default {
  title: "UI-Components/Input",
  component: Component,
  argTypes: {
    value: { control: "text" },
    onChange: { action: "onChange()" },
    label: { control: "text" },
    errors: { control: "array" },
    type: { options: InputTypes, control: "select" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {};
