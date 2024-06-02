import React from 'react';

const ServiceSubItem = ({ index, title, description }) => {
  return (
    <div className="c-service-sub-item">
      <span className="c-service-sub-item__index">
        {index < 10 ? `0${index}` : index}
      </span>
      <h2 className="c-service-sub-item__title">{title}</h2>
      <p
        className="c-service-sub-item__description"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></p>
    </div>
  );
};

export default ServiceSubItem;
