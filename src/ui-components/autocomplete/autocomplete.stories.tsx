/* eslint-disable no-magic-numbers */
import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";

export default {
  title: "UI-Components/Autocomplete",
  component: Component,
  argTypes: {
    value: { control: "text" },
    onChange: { action: "onValueChange()" },
    list: { control: "array" },
    label: { control: "array" },
    placeholder: { control: "array" },
    plain: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => <Component {...props} />;

export const Playground = Template.bind({});

Playground.args = {
  list: [
    {
      id: "1",
      label: "Standard Schnauzer",
    },
    {
      id: "2",
      label: "Giant Schnauzer",
    },
    {
      id: "3",
      label: "Mini Schnauzer",
    },
    {
      id: "4",
      label: "Poodle",
    },
    {
      id: "5",
      label: "Labrador",
    },
    {
      id: "6",
      label: "Afador",
    },
    {
      id: "7",
      label: "Afghan Hound",
    },
    {
      id: "8",
      label: "Aidi",
    },
    {
      id: "9",
      label: "Airedale Terrier",
    },
    {
      id: "10",
      label: "Akbash",
    },
    {
      id: "11",
      label: "Akita",
    },
    {
      id: "12",
      label: "Alano Español",
    },
    {
      id: "13",
      label: "Alaskan Klee Kai",
    },
    {
      id: "14",
      label: "Alaskan Malamute",
    },
    {
      id: "15",
      label: "Alpine Dachsbracke",
    },
    {
      id: "16",
      label: "American Bulldog",
    },
    {
      id: "17",
      label: "American Cocker Spaniel",
    },
    {
      id: "18",
      label: "American English Coonhound",
    },
    {
      id: "19",
      label: "American Eskimo Dog",
    },
    {
      id: "20",
      label: "American Foxhound",
    },
    {
      id: "21",
      label: "American Hairless Terrier",
    },
    {
      id: "22",
      label: "American Leopard Hound",
    },
    {
      id: "23",
      label: "American Staffordshire Terrier",
    },
    {
      id: "24",
      label: "American Water Spaniel",
    },
    {
      id: "25",
      label: "Anatolian Shepherd Dog",
    },
    {
      id: "26",
      label: "Appenzeller Sennenhund",
    },
    {
      id: "27",
      label: "Ariege Pointer",
    },
    {
      id: "28",
      label: "Ariegeois",
    },
    {
      id: "29",
      label: "Armant",
    },
    {
      id: "30",
      label: "Armenian Gampr dog",
    },
    {
      id: "31",
      label: "Artois Hound",
    },
  ],
  label: "Your favourite dog breed",
};
