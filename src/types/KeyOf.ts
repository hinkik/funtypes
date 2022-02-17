import { expected, success } from '../result';
import { create, Codec } from '../runtype';

export interface KeyOf<TObject extends Object>
  extends Codec<keyof TObject> {
  readonly tag: 'keyOf';
  readonly keys: Set<string>;
}

export function KeyOf<TObject extends Object>(
  name: string,
  object: TObject,
): KeyOf<TObject> {
  const keys = new Set(Object.keys(object));
  return create<KeyOf<TObject>>(
    'keyOf',
    value => (keys.has(typeof value === "number" ? value.toString() : value as any) ? success(value as any) : expected(name, value)),
    {
      keys,
      show: () => name,
    },
  );
}