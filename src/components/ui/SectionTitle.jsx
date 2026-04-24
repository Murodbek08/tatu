function SectionTitle({ children, light = false }) {
  return (
    <h2
      className={`text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 tracking-tight ${light ? "text-[var(--text-light)]" : "text-[var(--text-dark)]"}`}
      style={{ fontFamily: "sans-serif" }}
    >
      {children}
    </h2>
  );
}

export default SectionTitle;
