export * from './config';
export * from './pattern';

export const isType = (value: any) =>
  toString
    .call(value)
    .replace(/object|\[|]|\s/g, '')
    .toLowerCase();
