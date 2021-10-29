export * from './config';

export const isType = (value: any) =>
  toString
    .call(value)
    .replace(/object|\[|]|\s/g, '')
    .toLowerCase();
