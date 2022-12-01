import React from "react";
import { LayoutHeadless } from "../../src/layout";
import { DataDisplayAuthorizedDevices } from "../../src/data-display";
import type { NextPage } from "next";

const App: NextPage = () => (
  <LayoutHeadless>
    <DataDisplayAuthorizedDevices />
  </LayoutHeadless>
);

export default App;
