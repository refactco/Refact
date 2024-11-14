import React, { useEffect, useRef } from 'react';

interface CounterProps {
  number: string;
}

const Counter: React.FC<CounterProps> = ({ number }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animateDigits = () => {
      const digits = number.split('');
      const increment = containerRef.current?.querySelector('.digit-con')?.clientHeight || 0;
      const speed = 2000;

      digits.forEach((digit, index) => {
        const digitElem = containerRef.current?.querySelector(`.digit${index}`) as HTMLElement;
        if (digitElem) {
          digitElem.style.transition = `top ${Math.round(speed / (1 + index * 0.333))}ms ease`;
          digitElem.style.top = `-${increment * parseInt(digit, 10)}px`;
        }
      });
    };

    // Call animateDigits immediately on component mount
    animateDigits();
  }, [number]);

  const renderDigits = () => {
    const numChars = number.split('');
    const setOfNumbers = '0123456789';

    return numChars.map((char, index) => {
      if (setOfNumbers.includes(char)) {
        return (
          <span key={index} className="digit-con">
            <span className={`digit${index}`} style={{ position: 'relative', top: '0px' }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i}>{i}</div>
              ))}
            </span>
          </span>
        );
      } else {
        return <span key={index}>{char}</span>;
      }
    });
  };

  return (
    <div ref={containerRef} className="c-refact-number__num number">
      {renderDigits()}
    </div>
  );
};

export default Counter;
