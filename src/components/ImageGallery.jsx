import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import TransparentImage from './TransparentImage';

export default function ImageGallery({ product, activeIdx, onSelectIdx }) {
  return (
    <div className="gallery-column">
      {/* MAIN DISPLAY AREA */}
      <div className="main-image-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${product.id}-${activeIdx}`}
            initial={{ opacity: 0, scale: 0.85, y: 25, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, rotate: 2 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <TransparentImage
              src={product.images[activeIdx]}
              alt={product.name}
              className="main-image"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* THUMBNAIL ROW */}
      <div className="thumbnail-row">
        {product.images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onSelectIdx(idx)}
            className={`thumb-btn ${activeIdx === idx ? 'active' : ''}`}
          >
            <TransparentImage
              src={img}
              alt="thumb"
              className="thumb-img"
            />
            
            {activeIdx === idx && (
              <motion.div
                layoutId="activeThumbBorder"
                className="active-thumb-border"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
          </button>
        ))}

        <button 
          className="swap-btn"
          onClick={() => onSelectIdx((prev) => (prev === 0 ? 1 : 0))}
        >
          <ArrowLeftRight style={{ width: '1rem', height: '1rem' }} />
        </button>
      </div>
    </div>
  );
}