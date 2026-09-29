import React from 'react';
import { motion } from 'framer-motion';

export default function PriceDisplay({ price }) {
  return (
    <div className="price-tag">
      <span>₹</span>
      <motion.span
        key={price}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {price.toLocaleString('en-IN')}
      </motion.span>
    </div>
  );
}