function SectionSubtitle({ children, light = false }) {
  return (
    <p
      className={`text-base leading-relaxed ${light ? "text-white/60" : "text-slate-500"}`}
    >
      {children}
    </p>
  );
}

export default SectionSubtitle;
