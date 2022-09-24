/* eslint-disable no-magic-numbers */
import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component, { InputTypes } from "./index";

export default {
  title: "UI-Components/Input",
  component: Component,
  argTypes: {
    value: { control: "text" },
    onValueChange: { action: "onValueChange()" },
    label: { control: "text" },
    errors: { control: "array" },
    type: { options: InputTypes, control: "select" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => <Component {...props} />;

const TemplateExample: ComponentStory<typeof Component> = (props) => {
  const [value, setValue] = useState("");

  return <Component {...props} value={value} onChange={setValue} />;
};

export const Playground = Template.bind({});

export const Example = TemplateExample.bind({});

Playground.args = {};
