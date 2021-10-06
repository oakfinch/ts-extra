/* eslint-disable @typescript-eslint/no-explicit-any */
import { Simplify } from './simplify';
import { Unshift } from './unshift';
import { Index } from '../types/object-index';
import { DefinedLength } from './defined-length';

// eslint-disable-next-line @typescript-eslint/ban-types
type FromEntriesInner<T extends [Index, any][], U = { }> =
  DefinedLength<T> extends never
    ? Record<T[number][0], T[number][1]>
    : Unshift<T> extends [[infer K0, infer V0], infer TRest]
      ? K0 extends Index
        ? TRest extends [Index, any][]
          ? FromEntriesInner<TRest, U & Record<K0, V0>>
          // eslint-disable-next-line @typescript-eslint/ban-types
          : 'a'
        // eslint-disable-next-line @typescript-eslint/ban-types
        : U
      // eslint-disable-next-line @typescript-eslint/ban-types
      : 'c';

/**
 * An object constructed from entries `T` (like those returned from `Object.entries`)
 *
 * @category Utility
 * @example
 * ```
 * type A = FromEntries<[['foo', 'FOO'],['bar', 'BAR']]> // === {foo: 'FOO', bar: 'BAR'}
 * ```
 */
export type FromEntries<T extends [Index, any][]> = Simplify<FromEntriesInner<T>>;
