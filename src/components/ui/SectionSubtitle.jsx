function SectionSubtitle({ children, light = false }) {
  return (
    <p
      className={`text-xl leading-relaxed ${light ? "text-[var(--text-light)]/70" : "text-[var(--text-gray)]"}`}
    >
      {children}
    </p>
  );
}

export default SectionSubtitle;
