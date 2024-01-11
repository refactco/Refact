import { Link } from "gatsby";
import React from "react";

const CtaPost = () => {
  return (
    <footer className="c-article__footer">
      <div className="c-git">
        <div className="c-git__wrap">
          <h5 className="c-git__title">Looking to grow your media business?</h5>
          <p className="c-git__text">Get in touch and tell us about your project!</p>
        </div>
        <Link to="/contact" className='c-btn'>Get in Touch</Link>
      </div>
    </footer>
  );
};

export default CtaPost;
