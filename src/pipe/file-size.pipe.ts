import { useIntl } from "react-intl";
import numberPipe from "./number.pipe";

const EMPTY_VALUE = 0;

const KILOBYTE = 1024;
const MEGABYTE = 1048576;
const GIGABYTES = 1073741824;

const fileSizePipe = (value: number): string => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();

  if (value === EMPTY_VALUE) {
    return intl.formatMessage({ id: "common.file_size.empty" });
  }

  if (value < KILOBYTE) {
    return intl.formatMessage({ id: "common.file_size.bytes" }, { value: numberPipe(value) });
  }

  if (value >= KILOBYTE && value < MEGABYTE) {
    return intl.formatMessage({ id: "common.file_size.kilobytes" }, { value: numberPipe(value / KILOBYTE) });
  }

  if (value >= MEGABYTE && value < GIGABYTES) {
    return intl.formatMessage({ id: "common.file_size.megabytes" }, { value: numberPipe(value / MEGABYTE) });
  }

  if (value >= GIGABYTES) {
    return intl.formatMessage({ id: "common.file_size.gigabytes" }, { value: numberPipe(value / GIGABYTES) });
  }

  return intl.formatMessage({ id: "common.file_size.bytes" }, { value: numberPipe(value) });
};

export default fileSizePipe;
