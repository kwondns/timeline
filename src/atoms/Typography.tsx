import { cn } from '@/lib/utils';
import React, { ComponentProps } from 'react';

type TypographyComponentPropsType =
  | ComponentProps<'h1'>
  | ComponentProps<'h2'>
  | ComponentProps<'h3'>
  | ComponentProps<'h4'>
  | ComponentProps<'p'>
  | Record<string, string>;

type TypographyComponentType = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

type TypographyPropsType = {
  [key in TypographyComponentType]: (props: TypographyComponentPropsType) => React.ReactNode;
};

const typoType: { defaultClassName: string; component: TypographyComponentType }[] = [
  {
    defaultClassName: 'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
    component: 'h1',
  },
  { defaultClassName: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', component: 'h2' },
  {
    defaultClassName: 'scroll-m-20 text-2xl font-semibold tracking-tight',
    component: 'h3',
  },
  {
    defaultClassName: 'scroll-m-20 text-xl font-semibold tracking-tight',
    component: 'h4',
  },
  {
    defaultClassName: '',
    component: 'p',
  },
];

const Typography = {} as TypographyPropsType;
typoType.forEach(({ component, defaultClassName }) => {
  Typography[component] = ({ children, className, ...others }) =>
    React.createElement(component, { className: `${defaultClassName} ${cn(className)}`, ...others }, children);
});

export default Typography;
