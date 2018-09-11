function omit(
  obj: object,
  props: string[],
  fn?: (val, key: string, obj: object) => boolean
): object;

function omit(
  obj: object,
  fn: (val, key: string, obj: object) => boolean
): object;

export = omit;
