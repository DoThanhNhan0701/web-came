interface Props {
  condition: boolean;
  children: React.ReactNode;
  childrenIfFalse?: React.ReactNode;
}

export default function ConditionalRender({
  condition,
  children,
  childrenIfFalse = null,
}: Readonly<Props>) {
  return <>{condition ? children : childrenIfFalse}</>;
}
