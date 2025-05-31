import TWColors from 'tailwindcss/colors';

type TailwindColorPreStyleType = 'bg' | 'text' | 'fill' | 'border';
type TailwindColorWithNoInnerVariant =
  | 'black'
  | 'white'
  | 'transparent'
  | 'current'
  | 'inherit';

type TailwindColorType = `${Exclude<
  keyof typeof TWColors,
  TailwindColorWithNoInnerVariant
>}-${keyof typeof TWColors.slate}`;

export type TailwindGenericColorClassNameType<
  T extends TailwindColorPreStyleType
> = `${T}-${TailwindColorType}` | `${T}-${TailwindColorWithNoInnerVariant}`;
