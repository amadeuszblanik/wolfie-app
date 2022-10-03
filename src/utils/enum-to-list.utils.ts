import { ListItem } from "../types/list-item.types";

const enumToListUtils = (values: { [key: string]: string }, invert = false): ListItem[] =>
  Object.entries(values).map(([key, value]) => (!invert ? { id: key, label: value } : { id: value, label: key }));

export default enumToListUtils;
