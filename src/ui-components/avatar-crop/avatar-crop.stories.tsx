import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Avatar crop",
  component: Component,
  argTypes: {
    componentWidth: { control: "number" },
    width: { control: "number" },
    height: { control: "number" },
    src: { control: "text" },
    onCrop: { action: "onCrop()" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  width: 512,
  height: 512,
  componentWidth: 320,
  src: "https://images.pexels.com/photos/6218402/pexels-photo-6218402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};
