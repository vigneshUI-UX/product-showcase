import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { PRODUCTS, SIZES } from '../data/products';
import PriceDisplay from './PriceDisplay';
import SizeSelector from './SizeSelector';
import ImageGallery from './ImageGallery';
import ProductSwitcher from './ProductSwitcher';

export default function ProductDetail() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('7');
  const [isAdded, setIsAdded] = useState(false);

  const currentSizeObj = SIZES.find((s) => s.size === selectedSize) || SIZES[1];
  const currentPrice = selectedProduct.basePrice + currentSizeObj.priceDelta;

  const handleProductChange = (prod) => {
    setSelectedProduct(prod);
    setActiveImageIdx(0);
    setIsAdded(false);
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <div className="info-column">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <h1 className="product-title">{selectedProduct.name}</h1>
              <p className="product-desc">{selectedProduct.desc}</p>
            </motion.div>
          </AnimatePresence>

          <PriceDisplay price={currentPrice} />

          <div>
            <span className="section-label">
              Colour — <span className="color-name-highlight">{selectedProduct.colorName}</span>
            </span>
            <div className="color-options">
              {PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => handleProductChange(prod)}
                  className={`color-circle ${selectedProduct.id === prod.id ? 'active' : ''}`}
                  style={{ backgroundColor: prod.themeColor }}
                />
              ))}
            </div>
          </div>

          <SizeSelector
            sizes={SIZES}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />

          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.98 }}
            className="add-btn"
            style={{
              backgroundColor: isAdded ? '#059669' : selectedProduct.themeColor,
            }}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div
                  key="added"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="btn-content"
                >
                  <Check style={{ width: '1rem', height: '1rem' }} />
                  ADDED TO BAG
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  ADD TO BAG
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <ImageGallery
          product={selectedProduct}
          activeIdx={activeImageIdx}
          onSelectIdx={setActiveImageIdx}
        />
      </div>

      <ProductSwitcher
        products={PRODUCTS}
        selectedProduct={selectedProduct}
        onSelectProduct={handleProductChange}
      />
    </div>
  );
}