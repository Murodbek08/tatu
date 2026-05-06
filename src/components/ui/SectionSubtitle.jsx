function SectionSubtitle({ children, light = false }) {
  return (
    <p
      className={`text-xl leading-relaxed ${light ? "text-(--text-light)/70" : "text-(--text-gray)"}`}
    >
      {children}
    </p>
  );
}

export default SectionSubtitle;
