/* eslint-disable no-magic-numbers */
import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input from "../input";
import Component from "./index";

export default {
  title: "UI-Components/Form control",
  component: Component,
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    errors: { control: "array" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => <Component {...props} />;

const TemplateExample: ComponentStory<typeof Component> = (props) => {
  const [value, setValue] = useState("");

  return (
    <Component label={props.label} hint={props.hint} errors={props.errors}>
      <Input value={value} onChange={setValue} />
    </Component>
  );
};

export const Playground = Template.bind({});

export const Example = TemplateExample.bind({});

Playground.args = {
  label: "Label",
  hint: "Hint",
  errors: ["Error 1", "Error 2"],
};
