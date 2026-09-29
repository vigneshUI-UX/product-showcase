import React from 'react';
import { motion } from 'framer-motion';

export default function SizeSelector({ sizes, selectedSize, onSelectSize }) {
  return (
    <div>
      <span className="section-label">SIZE — Select</span>
      <div className="size-options">
        {sizes.map((s) => {
          const isSelected = selectedSize === s.size;
          return (
            <button
              key={s.size}
              onClick={() => onSelectSize(s.size)}
              className="size-btn"
            >
              {isSelected && (
                <motion.div
                  layoutId="activeSizeBg"
                  className="size-btn-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`size-btn-text ${isSelected ? 'active' : ''}`}>
                {s.size}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}