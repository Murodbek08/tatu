import { useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollReveal({
  once = true,
  amount = 0.15,
  margin = "0px 0px -60px 0px",
} = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount, margin });
  return { ref, isInView };
}
