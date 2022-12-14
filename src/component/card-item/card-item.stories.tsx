/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";
import { Icons } from "../../ui-components/icon";
import Component from "./index";

export default {
  title: "Components/Card item",
  component: Component,
  argTypes: {
    children: { control: "array" },
    icon: { options: Icons, control: "select" },
    background: { control: "array" },
  },
} as ComponentMeta<typeof Component>;

const StyledWrapper = styled.div`
  max-width: 520px;
  margin: 0 auto;
`;

const Template: ComponentStory<typeof Component> = (props) => (
  <StyledWrapper>
    <Component {...props} />
  </StyledWrapper>
);

export const Playground = Template.bind({});
Playground.args = {
  children: "Weight",
  icon: "barbell",
  value: "13.70 kg",
  background: ["green"],
};
