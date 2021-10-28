/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module 'jsencrypt' {
  export class JSEncrypt {
    constructor();
    setPublicKey(pk: string): void;
    encrypt(key: string): string;
  }
}

declare type Optional<T> = T | undefined;
declare type Nullable<T> = T | null | undefined;
declare type JSONObject = { [propName: string]: any };
declare type Recordable<T = any> = Record<string, T>;
declare type PromiseFunction<R = any> = (...args: any[]) => Promise<R>;
declare type Keys<T> = {
  [P in keyof T]: P;
};
declare type ChangeObjectValueType<O, VT = any> = { [P in keyof O]?: VT };
declare type Noop = (...args: any[]) => void;
declare interface LV<Value = any> {
  label: string;
  value: Value;
}

declare module 'slash2';
declare module 'omit.js';

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
}

declare let ga: Function;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

declare interface ListParams {
  pageSize?: number;
  pageNum?: number;
  keyword?: string;
  [propName: string]: any;
}

declare interface Pagination<T = JSONObject> {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  totalPage?: number;
  list: T[];
}

declare type YN = 'Y' | 'N';


declare interface ResponseData<T = any> {
  code?: string;
  message?: string;
  data?: T;
}