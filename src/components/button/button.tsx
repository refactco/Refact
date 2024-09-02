import React from "react";
import { Link } from "gatsby";

interface ButtonProps {
  className?: string;
  target?: string;
  url?: string;
  text?: string;
  type?: "primary" | "secondary";
  bgMode?: "light" | "dark";
  htmlType?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const BtnType = {
  PRIMARY: "primary" as "primary",
  SECONDARY: "secondary" as "secondary",
};

export const BgMode = {
  LIGHT: "light" as "light",
  DARK: "dark" as "dark",
};

const Button: React.FC<ButtonProps> = ({
  className = "",
  target,
  url,
  text,
  type = BtnType.PRIMARY,
  bgMode = BgMode.DARK,
  htmlType,
  disabled,
  onClick,
  children,
  ...props
}) => {
  const buttonClass = ["c-btn", `c-btn--${type} is-btn-${bgMode}`, className].join(" ").trim();

  const content = children || (
    <>
      <span>{text}</span>
      <div className="c-btn__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M6 18 18 6M8.25 6H18v9.75"/>
          </g>
        </svg>
      </div>
    </>
  );

  if (htmlType) {
    return (
      <button
        type={htmlType}
        className={buttonClass}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  } else {
    return target === "_blank" ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClass} {...props}>
        {content}
      </a>
    ) : (
      <Link to={url ?? ""} className={buttonClass} {...props}>
        {content}
      </Link>
    );
  }
  
};

export default Button;
