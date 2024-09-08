import React from "react";
import { Link } from "gatsby";

const Icons = {
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32"><path fill="currentColor" d="M15.988 2.384C8.259 2.381 2 8.638 2 16.36c0 6.107 3.916 11.297 9.369 13.203.734.185.622-.337.622-.693v-2.422c-4.241.497-4.413-2.31-4.697-2.778-.575-.982-1.935-1.232-1.528-1.7.965-.497 1.95.125 3.09 1.81.825 1.221 2.435 1.015 3.25.812.178-.735.56-1.391 1.085-1.9-4.394-.788-6.225-3.47-6.225-6.657 0-1.546.509-2.968 1.509-4.115-.637-1.89.06-3.51.153-3.75 1.816-.163 3.703 1.3 3.85 1.415 1.031-.278 2.21-.425 3.528-.425 1.325 0 2.506.154 3.547.435.353-.269 2.103-1.525 3.79-1.372.091.24.773 1.822.173 3.687 1.012 1.15 1.528 2.585 1.528 4.135 0 3.194-1.844 5.878-6.25 6.653a3.983 3.983 0 0 1 1.19 2.844v3.515c.025.281 0 .56.47.56 5.534-1.866 9.518-7.094 9.518-13.253 0-7.725-6.263-13.979-13.985-13.979Z"/></svg>
  ),
  wordpress: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32"><path fill="currentColor" d="M4.43 16c0 4.584 2.667 8.533 6.523 10.41L5.435 11.293A11.528 11.528 0 0 0 4.43 16ZM16 27.57c1.31-.002 2.61-.224 3.846-.657l-.083-.154-3.56-9.743-3.466 10.081c1.026.307 2.124.472 3.262.472Zm1.589-16.997 4.185 12.44 1.159-3.856c.493-1.6.872-2.748.872-3.742 0-1.436-.514-2.422-.944-3.18-.595-.964-1.139-1.774-1.139-2.719 0-1.067.8-2.05 1.95-2.05h.142a11.528 11.528 0 0 0-7.815-3.035 11.56 11.56 0 0 0-9.661 5.21l.739.02c1.209 0 3.076-.153 3.076-.153.636-.03.708.881.082.953 0 0-.626.083-1.333.114l4.227 12.533 2.533-7.59-1.807-4.943a20.647 20.647 0 0 1-1.209-.103c-.627-.04-.555-.995.07-.964 0 0 1.909.153 3.047.153 1.211 0 3.078-.153 3.078-.153.625-.03.706.881.081.953 0 0-.625.072-1.333.114v-.002ZM21.815 26a11.568 11.568 0 0 0 4.338-15.55 10.923 10.923 0 0 1-.8 5.334L21.814 26l.001-.001ZM16 29.333a13.333 13.333 0 1 1 0-26.666 13.333 13.333 0 0 1 0 26.666Z"/></svg>
  ),
  arrowleft: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M18 18 6 6M15.75 6H6v9.75"/></g></svg>
  ),
};
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
  icon?: "github" | "wordpress" | "arrowleft";
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
  icon,
  ...props
}) => {
  const buttonClass = ["c-btn", `c-btn--${type} is-btn-${bgMode}`, className, icon ? "has-btn-icon" : ""].join(" ").trim();

  const content = children || (
    <>
      {icon && (
        <div className="c-btn-icon">
          {Icons[icon]}
        </div>
      )}
      <span>{text}</span>
      {icon ? null : (
      <div className="c-btn__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M6 18 18 6M8.25 6H18v9.75"/>
          </g>
        </svg>
      </div>
      )}
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
