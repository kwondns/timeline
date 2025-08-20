type KbdProps = {
  children: React.ReactNode;
};
export default function Kbd(props: KbdProps) {
  const { children } = props;
  return (
    <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 py-3 font-mono font-medium opacity-100 select-none">
      <span className="text-xl">{children}</span>
    </kbd>
  );
}
