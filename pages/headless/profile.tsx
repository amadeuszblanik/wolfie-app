import React from "react";
import { LayoutHeadless } from "../../src/layout";
import { DataDisplayProfile } from "../../src/data-display";
import type { NextPage } from "next";

const App: NextPage = () => (
  <LayoutHeadless>
    <DataDisplayProfile />
  </LayoutHeadless>
);

export default App;
