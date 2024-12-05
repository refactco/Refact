import React, { useState, useEffect } from "react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import Button, { BgMode, BtnType } from "../button/button";

type Cta = {
  target?: "_blank" | "_self";
  title: string;
  url: string;
};

type Image = {
  altText: string;
  localFile: {
    childrenImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    }[];
  };
};

type PopupProps = {
  cta?: Cta;
  image?: Image;
  title?: string;
  text?: string;
};

const Popup: React.FC<PopupProps> = ({ cta, image, title, text }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const popupCookie = Cookies.get("hidePopup");
    if (!popupCookie) {
      const timer = setTimeout(() => setIsVisible(true), 5000); // Show popup after 5 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, []);

  const handleClose = (): void => {
    setIsVisible(false);
    Cookies.set("hidePopup", "true", { expires: 7 }); // Set cookie for 7 days
  };

  const handleCtaClick = (): void => {
    Cookies.set("hidePopup", "true", { expires: 7 }); // Set cookie for 7 days
    setIsVisible(false); // Close the popup
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      handleClose(); // Close popup on backdrop click
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  if (!isVisible) return null;

  const gatsbyImage = image?.localFile.childrenImageSharp[0].gatsbyImageData;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="c-popup-guide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="c-popup-guide__content"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClose}
              className="c-popup-guide__close"
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="16" fill="currentColor" />
                <path
                  stroke="#798686"
                  strokeLinecap="square"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                  d="M21.834 10.167 10.167 21.833M21.834 21.833 10.167 10.167"
                />
              </svg>
            </button>
            <div className="c-popup-guide__image">
              {gatsbyImage && (
                <GatsbyImage
                  image={getImage(gatsbyImage)!}
                  alt={image.altText}
                />
              )}
            </div>
            <div className="c-popup-guide__info">
              {title && <div className="c-popup-guide__title">{title}</div>}
              {text && <div className="c-popup-guide__text">{text}</div>}
              {cta && (
                <div className="c-popup-guide__cta">
                  <Button
                    text={cta.title}
                    url={cta.url}
                    target={cta.target}
                    type={BtnType.PRIMARY}
                    bgMode={BgMode.LIGHT}
                    onClick={handleCtaClick}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
