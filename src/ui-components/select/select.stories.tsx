/* eslint-disable no-magic-numbers */
import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Select",
  component: Component,
  argTypes: {
    value: { control: "text" },
    onChange: { action: "onValueChange()" },
    list: { control: "array" },
    label: { control: "array" },
    placeholder: { control: "array" },
    plain: { control: "boolean" },
    nullable: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => <Component {...props} />;

const TemplateExample: ComponentStory<typeof Component> = (props) => {
  const [value, setValue] = useState<string>("");

  return <Component {...props} value={value} onChange={(nextValue) => setValue(String(nextValue))} />;
};

export const Playground = Template.bind({});

export const Example = TemplateExample.bind({});

Playground.args = {
  list: [
    {
      id: "1",
      label: "Option 1",
    },
    {
      id: "2",
      label: "Option 2",
    },
    {
      id: "3",
      label: "Option 3",
    },
    {
      id: "4",
      label: "Option 4",
    },
    {
      id: "5",
      label: "Option 5",
    },
  ],
  label: "Your favourite number",
};
