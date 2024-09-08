import React from 'react';

const ServiceSubItem = ({ index, title, description }) => {
  return (
    <div className="c-capabilites-list__items" key={index}>
      <div className="c-sf__num">
        {index < 10 ? `0${index}` : index}
      </div>
      <div className="c-sf__title">{title}</div>
      <div
        className="c-sf__text"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></div>
    </div>
  );
};

export default ServiceSubItem;
