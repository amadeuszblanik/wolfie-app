/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Input File",
  component: Component,
  argTypes: {
    label: { control: "text" },
    onChange: { action: "onChange()" },
    errors: { control: "array" },
    plain: { control: "boolean" },
    multiple: { control: "boolean" },
    accept: { control: "array" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => <Component {...props} />;

export const Playground = Template.bind({});

Playground.args = {
  label: "Select file",
  accept: ["image/png", "image/jpg", "image/jpeg"],
};
