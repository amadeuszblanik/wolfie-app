import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Theme from "../../settings/theme";
import Component from "./index";

export default {
  title: "UI-Components/Pill",
  component: Component,
  argTypes: {
    label: { control: "text" },
    variant: { options: Object.keys(Theme.dark.palette), control: "multi-select" },
    onRemove: { action: "onRemove()" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  label: "Pill",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  variant: "blue",
};
