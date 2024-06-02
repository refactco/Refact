import React from 'react';
import ContainerBox from '../container-box/container-box';

const Testimonial = ({ text, name, logo, position }) => {
  return (
    <ContainerBox className="c-work__testimonial-wrapper is-services">
      <div className="c-work__testimonial">
        <div className="c-work-testimonial__text">
          <div className="c-work-testimonial__quote">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              fill="none"
              viewBox="0 0 80 60"
            >
              <path
                fill="#C6F0C2"
                d="m25 10 5-10H20C8.95 0 0 13.95 0 25v35h35V25H15c0-15 10-15 10-15Zm35 15c0-15 10-15 10-15l5-10H65C53.95 0 45 13.95 45 25v35h35V25H60Z"
              />
            </svg>
          </div>
          <span>{text}</span>
        </div>
        <div className="c-work-testimonial__info">
          <div
            className="c-work-testimonial__logo"
            dangerouslySetInnerHTML={{
              __html: logo,
            }}
          ></div>
          <div className="c-work-testimonial__name">{name}</div>
          <div className="c-work-testimonial__position">{position}</div>
        </div>
      </div>
    </ContainerBox>
  );
};

export default Testimonial;
