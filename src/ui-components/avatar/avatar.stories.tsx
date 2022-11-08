import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SizesEnum } from "../../settings/sizes";
import Component from "./index";

export default {
  title: "UI-Components/Avatar",
  component: Component,
  argTypes: {
    children: { control: "text" },
    alt: { control: "text" },
    size: { options: SizesEnum, control: "select" },
    onEdit: { action: "onEdit()" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  children: "https://placedog.net/1920?random",
  size: SizesEnum.ExtraLarge2,
};
