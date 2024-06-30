/* eslint-disable react-hooks/rules-of-hooks */
// From https://gist.github.com/nandorojo/052887f99bb61b54845474f324aa41cc

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { useNavigation } from '../router/use-navigation';
import { useRoute } from './use-route';

function useStable<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

function useStableCallback<T extends (...args: any[]) => any>(
  callback: T | undefined
): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}

type Config<
  Props extends Record<string, unknown>,
  Required extends boolean,
  ParsedType,
  InitialValue
> = (Required extends false
  ? {
    parse?: (value?: string | string[]) => ParsedType;
  }
  : {
    parse: (value?: string | string[]) => ParsedType;
  }) & {
    stringify?: (value: ParsedType) => string;
    initial: InitialValue;
    paramsToClearOnSetState?: (keyof Props)[];
  };

type Params<
  Props extends Record<string, unknown> = Record<string, string>,
  Name extends Extract<keyof Props, string> = Extract<keyof Props, string>,
  NullableUnparsedParsedType extends Props[Name] | undefined =
  | Props[Name]
  | undefined,
  ParseFunction extends
  | undefined
  | ((
    value?: string | string[]
  ) => NonNullable<NullableUnparsedParsedType>) = (
    value?: string | string[]
  ) => NonNullable<NullableUnparsedParsedType>,
  InitialValue = NullableUnparsedParsedType | undefined,
  ParsedType = InitialValue extends undefined
  ? NullableUnparsedParsedType
  : ParseFunction extends undefined
  ? NullableUnparsedParsedType
  : NonNullable<NullableUnparsedParsedType>
> = NonNullable<ParsedType> extends string
  ?
  | [name: Name, config: Config<Props, false, ParsedType, InitialValue>]
  | [name: Name]
  : [name: Name, config: Config<Props, true, ParsedType, InitialValue>];

type Returns<
  Props extends Record<string, unknown> = Record<string, string>,
  Name extends keyof Props = keyof Props,
  NullableUnparsedParsedType extends Props[Name] | undefined =
  | Props[Name]
  | undefined,
  ParseFunction extends
  | undefined
  | ((
    value?: string | string[]
  ) => NonNullable<NullableUnparsedParsedType>) = (
    value?: string | string[]
  ) => NonNullable<NullableUnparsedParsedType>,
  InitialValue = NullableUnparsedParsedType | undefined,
  ParsedType = InitialValue extends undefined
  ? NullableUnparsedParsedType
  : ParseFunction extends undefined
  ? NullableUnparsedParsedType
  : NonNullable<NullableUnparsedParsedType>
> = readonly [
  state: ParsedType | InitialValue,
  setState: (value: ParsedType, options?: SetStateOptions) => void
];

type SetStateOptions = {
  /**
   * Override whether this function calls `Router.push` or `Router.replace`.
   *
   * By default, `Router.push` is called if the query parameter already exists in the URL.
   */
  webBehavior?: 'push' | 'replace';
};
