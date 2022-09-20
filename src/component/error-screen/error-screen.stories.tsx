/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "Components/Error screen",
  component: Component,
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    onTryAgain: { action: "onTryAgain()" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  title: "Something went wrong",
  message: "Please try again later",
};
