/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";
import { DoggoTextVariant } from "../text";

export default {
  title: "UI-Components/List",
  component: Component,
  argTypes: {
    items: { control: "array" },
    textVariant: { options: DoggoTextVariant, control: "select" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  label: "KG",
  items: [
    ["13.70", "5 Sept at 11:22am"],
    ["13.70", "5 Sept at 11:22am"],
    ["13.70", "5 Sept at 11:22am"],
  ],
  textVariant: DoggoTextVariant.Body,
};
