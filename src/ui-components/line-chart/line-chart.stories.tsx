import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Line chart",
  component: Component,
  argTypes: {
    data: { control: "array" },
    width: { control: "number" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  data: [
    { y: 13.7, x: new Date("2022-09-16"), labelX: "16 September 2022" },
    { y: 14.1, x: new Date("2022-08-16"), labelX: "16 Aug 2022" },
    { y: 13.5, x: new Date("2022-08-16"), labelX: "16 Aug 2022" },
    { y: 13.3, x: new Date("2022-08-12"), labelX: "12 Aug 2022" },
    { y: 12.3, x: new Date("2022-07-27"), labelX: "27 July 2022" },
    { y: 11.5, x: new Date("2022-07-16"), labelX: "16 July 2022" },
    { y: 11.25, x: new Date("2022-07-12"), labelX: "12 July 2022" },
    { y: 11, x: new Date("2022-07-10"), labelX: "10 July 2022" },
    { y: 10.85, x: new Date("2022-07-08"), labelX: "8 July 2022" },
  ],
};
