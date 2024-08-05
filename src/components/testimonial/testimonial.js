import React from 'react';
import ContainerBox from '../container-box/container-box';

const Testimonial = ({ text, name, position }) => {
  return (
    <ContainerBox className="c-work__testimonial-wrapper is-services">
      <div className="c-work__testimonial">
        <div className="c-work-testimonial__text">
          <div className="c-work-testimonial__quote">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" fill="none" viewBox="0 0 64 48"><path fill="#D9EED6" d="m20 8 4-8h-8C7.16 0 0 11.16 0 20v28h28V20H12c0-12 8-12 8-12Zm28 12c0-12 8-12 8-12l4-8h-8c-8.84 0-16 11.16-16 20v28h28V20H48Z" /></svg>
          </div>
          <span dangerouslySetInnerHTML={{__html: text}} />
        </div>
        <div className="c-work-testimonial__info">
          {name && (
            <div className="c-work-testimonial__name">{name}</div>
          )}
          {position && (
            <div className="c-work-testimonial__position">{position}</div>
          )}
        </div>
      </div>
    </ContainerBox>
  );
};

export default Testimonial;
