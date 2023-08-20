const util = <T>(arr: T[]): T[] => arr.filter((v, i, a) => a.indexOf(v) === i);

export default util;
