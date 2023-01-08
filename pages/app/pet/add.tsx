import { useIntl } from "react-intl";
import { LayoutApp } from "../../../src/layouts";
import { FormPetAdd } from "../../../src/form";

export default function Page() {
  const intl = useIntl();

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.pet_add.title" })}>
      <FormPetAdd />
    </LayoutApp>
  );
}
