import { cn } from '@/lib/utils';
import React, { ComponentProps } from 'react';

type TypographyComponentPropsType =
  | ComponentProps<'h1'>
  | ComponentProps<'h2'>
  | ComponentProps<'h3'>
  | ComponentProps<'h4'>
  | ComponentProps<'p'>
  | ComponentProps<'span'>
  | Record<string, string>;

export type TypographyComponentType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

export type TypographyPropsType = {
  [key in TypographyComponentType]: (props: TypographyComponentPropsType) => React.ReactNode;
};

export const typoType: { defaultClassName: string; component: TypographyComponentType }[] = [
  {
    defaultClassName: 'scroll-m-20 text-center text-xl md:text-4xl font-extrabold tracking-tight text-balance',
    component: 'h1',
  },
  { defaultClassName: 'scroll-m-20 pb-2 text-lg md:text-3xl font-semibold tracking-tight first:mt-0', component: 'h2' },
  {
    defaultClassName: 'scroll-m-20 text-base md:text-2xl font-semibold tracking-tight',
    component: 'h3',
  },
  {
    defaultClassName: 'scroll-m-20 text-sm md:text-xl font-semibold tracking-tight',
    component: 'h4',
  },
  {
    defaultClassName: '',
    component: 'p',
  },
  {
    defaultClassName: 'text-sm',
    component: 'span',
  },
];

const Typography = {} as TypographyPropsType;
typoType.forEach(({ component, defaultClassName }) => {
  Typography[component] = ({ children, className, ...others }) =>
    React.createElement(component, { className: `${defaultClassName} ${cn(className)}`, ...others }, children);
});

export default Typography;
