'use client';

import dynamic from 'next/dynamic';
import { IconType, ICON } from '@/constants/ICON';

const Icon = ({ name, size = 20 }: { name: IconType; size?: number }) => {
  const IconComponent = ICON[name];
  const Loaded = dynamic(() => Promise.resolve(IconComponent), { ssr: false });
  const classSize = `size-[${size}px]`;
  return (
    <span className={`inline-flex items-center justify-center ${classSize}`}>
      <Loaded size={size} className={classSize} aria-label={name} />
    </span>
  );
};

export default Icon;
