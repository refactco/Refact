import React from 'react';
import ContainerBox from '../container-box/container-box';
import ServiceSubItem from './service-sub-item/service-sub-item';

const ServiceSubItemList = ({
  subList,
  title,
  description,
  numberOfColumns,
  whiteColor = false,
}) => {
  const columnClassName =
    numberOfColumns === 3
      ? 'c-service-sub-item-list__wrapper--three-column'
      : '';
  const backColorClassName = whiteColor
    ? 'c-service-sub-item-list--white-background'
    : '';

  return (
    <ContainerBox className={`c-service-sub-item-list ${backColorClassName}`}>
      <div className='c-capabilites'>
      {title && (
      <div className='c-section'>
        <h2 className="c-section__title">{title}</h2>
        {description && (
          <div className="c-section__desc" dangerouslySetInnerHTML={{__html:description}} />
        )}
      </div>
      )}
      <div className={`c-service-sub-item-list__wrapper ${columnClassName}`}>
        {subList.map((subItem, index) => {
          const { title, description } = subItem;

          return (
            <ServiceSubItem
              index={index + 1}
              title={title}
              key={index}
              description={description}
            />
          );
        })}
      </div>
      </div>
    </ContainerBox>
  );
};

export default ServiceSubItemList;
