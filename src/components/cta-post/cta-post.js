import React from "react";
import { PopupButton } from "react-calendly";

const CtaPost = () => {
  return (
    <footer className="c-article__footer">
      <div className="c-git">
        <div className="c-git__wrap">
          <h5 className="c-git__title">Looking to grow your media business?</h5>
          <p className="c-git__text">Get in touch and tell us about your project!</p>
        </div>
        {typeof window !== 'undefined' && (
          <>
          <PopupButton
            url="https://calendly.com/saeedreza/30min"
            rootElement={document.body}
            text="Get in Touch"
            className='c-btn'
          />
          </>
        )}
      </div>
    </footer>
  );
};

export default CtaPost;
