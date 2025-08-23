import Image from 'next/image';

export default function NextImage(props: any) {
  const { node: _node, ...rest } = props;
  return <Image {...rest} />;
}
