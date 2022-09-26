/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "Components/Add weight",
  component: Component,
  argTypes: {
    onClose: { action: "onClose()" },
    onAdd: { action: "onAdd()" },
    unit: { control: "text" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => <Component {...props} />;

export const Playground = Template.bind({});
Playground.args = {
  unit: "KG",
};
