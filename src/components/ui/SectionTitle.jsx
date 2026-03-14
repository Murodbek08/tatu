function SectionTitle({ children, light = false }) {
  return (
    <h2
      className={`text-3xl md:text-[2.5rem] font-black leading-[1.15] mb-3 ${light ? "text-white" : "text-slate-900"}`}
      style={{ fontFamily: "Georgia, serif" }}
    >
      {children}
    </h2>
  );
}

export default SectionTitle;
