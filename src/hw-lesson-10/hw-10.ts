/* Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.
Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.
Вам потрібно створити тип UpperCaseKeys, який буде приводити всі ключі до верхнього регістру.
І саме цікаве. Створіть тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором. */

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: T[K] extends object
    ? DeepRequireReadonly<T[K]>
    : T[K];
};

type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<string & K>]: T[K];
};

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: PropertyDescriptor;
};
