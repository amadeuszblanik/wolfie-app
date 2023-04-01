import { useIntl } from "react-intl";
import { LayoutApp } from "../../../../src/layouts";
import { FormPet, FormPetDelete } from "../../../../src/form";

export default function Page() {
  const intl = useIntl();

  return (
    <LayoutApp title={intl.formatMessage({ id: "page.pet_edit.title" })}>
      <FormPet />
      <FormPetDelete />
    </LayoutApp>
  );
}
