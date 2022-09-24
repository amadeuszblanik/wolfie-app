import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";
import { SizesEnum } from "../../settings/sizes";

export default {
  title: "UI-Components/Loader",
  component: Component,
  argTypes: {
    size: { options: SizesEnum, control: "select" },
    fullScreen: { control: "boolean" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {};
