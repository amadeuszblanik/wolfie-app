/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Input Datetime",
  component: Component,
  argTypes: {
    value: { control: "date" },
    onChange: { action: "onChange()" },
    max: { control: "date" },
    min: { control: "date" },
    plain: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => <Component {...props} />;

export const Playground = Template.bind({});

Playground.args = {};
