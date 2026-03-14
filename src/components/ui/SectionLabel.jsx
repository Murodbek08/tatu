function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 text-[11px] font-black tracking-[0.12em] uppercase px-4 py-1.5 rounded-full mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
      {children}
    </span>
  );
}

export default SectionLabel;
