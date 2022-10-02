import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Photo crop [WIP]",
  component: Component,
  argTypes: {
    src: { control: "text" },
    onCrop: { action: "onCrop()" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  src: "https://images.pexels.com/photos/6218402/pexels-photo-6218402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};
