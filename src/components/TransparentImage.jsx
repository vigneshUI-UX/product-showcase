import React, { useRef, useEffect, useState } from 'react';

export default function TransparentImage({ src, alt, className, style }) {
  const [processedSrc, setProcessedSrc] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Allow canvas data extraction
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image on hidden canvas
      ctx.drawImage(img, 0, 0);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Loop through pixels and make white/light-gray transparent
        // Threshold: R > 230, G > 230, B > 230
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (r > 225 && g > 225 && b > 225) {
            data[i + 3] = 0; // Set Alpha to 0 (Fully Transparent)
          }
        }

        ctx.putImageData(imageData, 0, 0);

        if (isMounted) {
          setProcessedSrc(canvas.toDataURL('image/png'));
        }
      } catch (err) {
        // Fallback if cross-origin policy blocks pixel access
        if (isMounted) setProcessedSrc(src);
      }
    };

    img.onerror = () => {
      if (isMounted) setProcessedSrc(src);
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <img
      src={processedSrc || src}
      alt={alt}
      className={className}
      style={style}
    />
  );
}