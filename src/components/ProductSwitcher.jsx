import React from 'react';
import { motion } from 'framer-motion';
import TransparentImage from './TransparentImage';

export default function ProductSwitcher({ products, selectedProduct, onSelectProduct }) {
  return (
    <div className="footer-switcher">
      <span className="section-label">Also Available</span>
      <div className="switcher-list">
        {products.map((prod) => {
          const isActive = selectedProduct.id === prod.id;
          return (
            <button
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="switcher-btn"
            >
              <TransparentImage 
                src={prod.images[0]} 
                alt={prod.name} 
                className="switcher-thumb" 
              />
              <span className={`switcher-label ${isActive ? 'active' : ''}`}>
                {prod.id.toUpperCase()}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeProductBar"
                  className="active-indicator-bar"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}