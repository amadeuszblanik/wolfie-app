/* eslint-disable no-magic-numbers */
import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Input Number",
  component: Component,
  argTypes: {
    value: { control: "number" },
    onChange: { action: "onChange()" },
    max: { control: "number" },
    min: { control: "number" },
    plain: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => <Component {...props} />;

export const Playground = Template.bind({});

Playground.args = {};
