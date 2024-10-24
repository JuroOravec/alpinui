export type Tail<T extends any[]> = ((...t: T) => void) extends (
  h: any,
  ...r: infer R
) => void
  ? R
  : never;
