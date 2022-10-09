/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "Components/Select medicines",
  component: Component,
  argTypes: {
    onChange: { action: "onChange()" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => <Component {...props} />;

export const Playground = Template.bind({});
Playground.args = {};
