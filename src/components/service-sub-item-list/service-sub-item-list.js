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
      {title ? (
        <div className="c-page-header__sub-title c-service-sub-item-list__title">
          {title}
        </div>
      ) : null}
      {description ? (
        <p className="c-service-sub-item-list__description" style={{ maxWidth: 924 }}>{description}</p>
      ) : null}
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
    </ContainerBox>
  );
};

export default ServiceSubItemList;
