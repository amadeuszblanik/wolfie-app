/* eslint-disable no-magic-numbers */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./index";
import { PetKind } from "../../types/pet-kind.types";
import { DoggoContainer } from "../../ui-components";

export default {
  title: "Components/Pet card grid",
  component: Component,
  argTypes: {
    pets: { control: "array" },
  },
} as ComponentMeta<typeof Component>;

const PET_MOCK = {
  id: "1",
  name: "Testie",
  kind: PetKind.Dog,
  microchip: "123456789",
  image: "https://placedog.net/1920?random",
  createdAt: new Date(),
  currentWeight: {
    id: "1",
    raw: 10,
    formatted: "10 kg",
    rawGram: 10000,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  birthDate: new Date("2020-02-12"),
  vaccinations: 1,
  medicines: 1,
  breed: {
    id: 1,
    name: "Standard Schnauzer",
    group: "Working",
    section: "Gundogs",
    provisional: "No",
    country: "Germany",
    url: "https://en.wikipedia.org/wiki/Standard_Schnauzer",
    image: "https://images.dog.ceo/breeds/schnauzer-standard/n02097298_1003.jpg",
    pdf: "https://en.wikipedia.org/wiki/Standard_Schnauzer",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  updatedAt: new Date(),
};

const Template: ComponentStory<typeof Component> = (props) => (
  <DoggoContainer fullWidth>
    <Component {...props} />
  </DoggoContainer>
);

export const Playground = Template.bind({});
Playground.args = {
  pets: [PET_MOCK, PET_MOCK, PET_MOCK],
};
