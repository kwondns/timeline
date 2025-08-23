import Image from 'next/image';

export default function NextImage(props: any) {
  const { node: _node, ...rest } = props;
  return <Image width={800} height={500} {...rest} />;
}
