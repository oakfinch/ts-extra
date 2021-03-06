/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add, Subtract } from "./add";
import { Length } from "./length";

type SliceStart<
  T extends readonly any[],
  S extends number,
  U extends any[] = []
> = Subtract<Add<T["length"], U["length"]>, S> extends never
  ? []
  : U["length"] extends S
  ? T
  : T extends [infer First, ...infer Rest]
  ? Rest extends readonly any[]
    ? SliceStart<Rest, S, [...U, First]>
    : never
  : never;

type SliceEnd<
  T extends readonly any[],
  S extends number,
  U extends any[] = []
> = Subtract<Add<T["length"], U["length"]>, S> extends never
  ? []
  : U["length"] extends S
  ? T
  : T extends [...infer Rest, infer Last]
  ? Rest extends readonly any[]
    ? SliceEnd<Rest, S, [Last, ...U]>
    : never
  : U;

export type Slice<
  T extends readonly any[],
  S extends number = 0,
  E = Length<T>
> = Length<T> extends never
  ? T
  : E extends number
  ? SliceStart<SliceEnd<T, Subtract<T["length"], E>>, S>
  : [];
