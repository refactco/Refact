import React from "react";
import Button, {BgMode, BtnType} from "../button/button";

const CtaPost = () => {
  return (
    <footer className="c-article__footer">
      <div className="c-git">
        <div className="c-git__wrap">
          <h5 className="c-git__title">Looking to grow your media business?</h5>
          <p className="c-git__text">Get in touch and tell us about your project!</p>
        </div>
        <Button 
          url="/contact"
          text="Get in Touch"
          type={BtnType.PRIMARY} 
          bgMode={BgMode.LIGHT}
        />
      </div>
    </footer>
  );
};

export default CtaPost;
