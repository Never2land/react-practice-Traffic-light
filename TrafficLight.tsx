import React, { useState, useEffect } from 'react';

function Light({ backgroundColor }) {
  return <div className="traffic-light" style={{ backgroundColor }}></div>;
}

export default function TrafficLight({
  initialColor = 'green',
  config,
  layout = 'vertical',
}) {
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    const { duration, next } = config[currentColor];

    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentColor]);

  return (
    <div
      className={
        'traffic-light-container ' +
        `${layout === 'vertical' ? 'traffic-light-container--vertical' : ''}`
      }
    >
      {Object.keys(config).map((color) => (
        <Light
          backgroundColor={
            color === currentColor
              ? config[currentColor].backgroundColor
              : undefined
          }
        />
      ))}
    </div>
  );
}
