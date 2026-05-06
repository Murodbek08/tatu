function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] text-xs font-black tracking-[0.12em]  px-4 py-2 rounded-full mb-5">
      <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)]" />
      {children}
    </span>
  );
}

export default SectionLabel;
