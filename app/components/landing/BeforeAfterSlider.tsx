"use client";
import { useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before restoration",
  afterAlt = "After restoration",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  // If className includes height classes, use those, otherwise use default h-80
  const heightClass = className.includes("h-") ? "" : "h-80";
  const containerClasses = `relative w-full ${heightClass} overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 ${className}`;

  return (
    <div className={containerClasses}>
      {/* Before Image */}
      <div className="absolute inset-0 bg-gray-900">
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="w-full h-full object-contain"
        />
      </div>

      {/* After Image with clip-path */}
      <div
        className="absolute inset-0 bg-gray-900"
        style={{
          clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`,
        }}
      >
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Slider Control */}
      <div className="absolute inset-0 flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="w-full h-full opacity-0 cursor-ew-resize"
        />

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center">
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-4 bg-gray-400"></div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
        Before
      </div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
        After
      </div>
    </div>
  );
}
