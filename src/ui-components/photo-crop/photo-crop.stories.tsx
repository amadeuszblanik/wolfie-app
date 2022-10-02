import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Photo crop",
  component: Component,
  argTypes: {
    src: { control: "text" },
    onCrop: { action: "onCrop()" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  src: "http://localhost:3000/uploads/2020-Mercedes-AMG-A45-005-1440w_1664669426847.jpg",
};
