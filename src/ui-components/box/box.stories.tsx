import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component, { BoxWidth, FlexAlign } from "./index";
import Theme from "../../settings/theme";
import { SizesEnum } from "../../settings/sizes";

export default {
  title: "UI-Components/Box",
  component: Component,
  argTypes: {
    background: { options: Object.keys(Theme.dark["palette"]), control: "select" },
    border: { options: SizesEnum, control: "select" },
    padding: { control: "object" },
    width: { options: BoxWidth, control: "select" },
    inline: { control: "boolean" },
    column: { control: "boolean" },
    alignX: { options: FlexAlign, control: "select" },
    alignY: { options: FlexAlign, control: "select" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Dolor sit ametum aud ipsum!</p>
  </Component>
);

export const Playground = Template.bind({});
Playground.args = {};
