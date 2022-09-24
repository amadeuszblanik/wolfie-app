import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";
import { SizesEnum } from "../../settings/sizes";

export default {
  title: "UI-Components/Avatar",
  component: Component,
  argTypes: {
    children: { control: "text" },
    alt: { control: "text" },
    size: { options: SizesEnum, control: "select" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  children: "https://placedog.net/1920?random",
  size: SizesEnum.Medium,
};
