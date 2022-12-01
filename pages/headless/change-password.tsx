import React from "react";
import { LayoutHeadless } from "../../src/layout";
import { FormChangePassword } from "../../src/form";
import type { NextPage } from "next";

const App: NextPage = () => (
  <LayoutHeadless>
    <FormChangePassword />
  </LayoutHeadless>
);

export default App;
