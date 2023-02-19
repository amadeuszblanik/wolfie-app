export enum ChangeCaseUtil {
  CamelCase = "camelCase",
  SnakeCase = "snakeCase",
}

const util = (value: string, inputCase: ChangeCaseUtil, outputCase: ChangeCaseUtil): string => {
  switch (inputCase) {
    case ChangeCaseUtil.CamelCase:
      switch (outputCase) {
        case ChangeCaseUtil.CamelCase:
          return value;
        case ChangeCaseUtil.SnakeCase:
          return value.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1_$2").toLowerCase();
      }
      break;
    case ChangeCaseUtil.SnakeCase:
      switch (outputCase) {
        case ChangeCaseUtil.CamelCase:
          return value.replace(/([-_][a-z0-9])/gi, ($1) => $1.toUpperCase().replace("-", "").replace("_", ""));
        case ChangeCaseUtil.SnakeCase:
          return value;
      }
      break;
    default:
      return value;
  }
};

export default util;
