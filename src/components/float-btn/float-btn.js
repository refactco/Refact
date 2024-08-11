import { Link } from "gatsby";
import React, { useState, useEffect } from "react";

const FloatButton = () => {
  const [hideText, setHideText] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const footer = document.querySelector('.c-section--cta');
      const footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : 0;
      const windowHeight = window.innerHeight;

      if (scrollTop > 250) {
        setHideText(true);
      } else {
        setHideText(false);
      }

      if (footerTop && scrollTop + windowHeight >= footerTop) {
        setHideButton(true);
      } else {
        setHideButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (hideButton) {
    return null;
  }

  return (
    <Link to="/contact" className={`c-float-btn ${hideText ? 'has-hide-text' : ''}`}>
      <div className="c-float-btn__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" viewBox="0 0 14 13">
          <path fill="currentColor" d="M11.795 12.707a1 1 0 0 0 1.415-1.414l-1.415 1.414ZM1.5-.003a1 1 0 0 0-1 1v9a1 1 0 0 0 2 0v-8h8a1 1 0 0 0 0-2h-9Zm11.71 11.296L2.207.29.793 1.705l11.002 11.002 1.415-1.414Z"/>
        </svg>
      </div>
      <span className="c-float-btn__text">
        Let’s Work Together
      </span>
    </Link>
  );
};

export default FloatButton;
