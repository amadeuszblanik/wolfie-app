import { SelectItem } from "bme-ui/dist/cjs/types/atoms/select/types";
import { IntlShape } from "react-intl/src/types";

const util = (value: Record<string, string | number>, translationKey: string, intl: IntlShape): SelectItem[] =>
  Object.values(value).map((entry) => ({
    key: String(entry),
    label: intl.formatMessage({ id: `${translationKey}.${String(entry).toLowerCase()}` }),
  }));

export default util;
