import { useState } from "react";
import { motion } from "framer-motion";
import RiskForm from "../components/risk/RiskForm";
import RiskResult from "../components/risk/RiskResult";

export default function RiskPrediction() {
  const [result, setResult] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]"
    >
      <RiskForm onResult={setResult} />
      <RiskResult result={result} />
    </motion.div>
  );
}