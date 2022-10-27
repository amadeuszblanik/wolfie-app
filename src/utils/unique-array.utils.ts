const util = <T>(array: T[]): T[] => Array.from(new Set(array));

export default util;
