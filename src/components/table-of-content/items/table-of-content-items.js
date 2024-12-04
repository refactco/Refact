import React from 'react';

const TableOfContentItems = ({
  headings = [],
  onClose,
  isSub,
  activeIndex,
  openIndexes,
  onActiveIndexChange,
}) => {
  function getScrollDirection(targetScrollTop) {
    let result = '';
    const currentScrollTop = document.documentElement.scrollTop;

    if (targetScrollTop > currentScrollTop) {
      // Downscroll
      result = 'down';
    } else {
      // Upscroll
      result = 'up';
    }

    return result;
  }

  function scrollToElementWithOffset(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;
    const targetScrollTop = rect.top + scrollTop;

    const direction = getScrollDirection(targetScrollTop);
    const offset =
      window.innerWidth <= 992
        ? direction === 'up'
          ? 120
          : 48
        : direction === 'up'
        ? 70
        : 0;

    window.scrollTo({
      top: targetScrollTop - offset,
      behavior: window.innerWidth <= 992 ? 'instant' : 'smooth',
    });
  }

  const handleClick = (element, index, event) => {
    if (
      event.target.classList.contains('exclude-click') ||
      event.target.closest('.exclude-click')
    ) {
      let nextCollapsible = event.target.closest('li').nextElementSibling;

      while (nextCollapsible) {
        if (nextCollapsible.classList.contains('collapsible')) {
          nextCollapsible.classList.toggle('is-opened');
          return;
        }
        nextCollapsible = nextCollapsible.nextElementSibling;
      }

      return;
    } else {
      onClose?.();
      scrollToElementWithOffset(element);
      const allSelectedItems = document.querySelectorAll(
        '.c-table-of-content__item.is-active'
      );

      allSelectedItems.forEach((item) => {
        item.classList.remove('is-active');
      });

      onActiveIndexChange(index);
    }
  };

  function findNextCollapsible(currentElement) {
    let sibling = currentElement.nextElementSibling;

    while (sibling) {
      if (sibling.classList && sibling.classList.contains('collapsible')) {
        return sibling;
      }

      let collapsible = sibling.querySelector('.collapsible');
      if (collapsible) {
        return collapsible;
      }
      sibling = sibling.nextElementSibling;
    }

    let parent = currentElement.parentElement;

    while (parent && parent !== document) {
      sibling = parent.nextElementSibling;
      while (sibling) {
        if (sibling.classList && sibling.classList.contains('collapsible')) {
          return sibling;
        }

        let collapsible = sibling.querySelector('.collapsible');

        if (collapsible) {
          return collapsible;
        }
        sibling = sibling.nextElementSibling;
      }
      parent = parent.parentElement;
    }

    return null;
  }

  const toggleCollapseItem = (event) => {
    const nextCollapsible = findNextCollapsible(event.target);

    // if (
    //   (!!nextCollapsible.style.maxHeight &&
    //     nextCollapsible.style.maxHeight !== '0px') ||
    //   nextCollapsible.classList.contains('is-opened')
    // ) {
    //   nextCollapsible.style.maxHeight = 0;
    // } else {
    //   nextCollapsible.style.maxHeight = nextCollapsible.scrollHeight + 'px';
    // }

    nextCollapsible.classList.toggle('is-opened');
    event.target.closest('svg').classList.toggle('chevron-down');
  };

  return (
    <ul
      id={headings[0]?.text}
      className={`c-table-of-content__list${
        isSub
          ? ` collapsible${
              openIndexes === headings[0].index - 1 ? ' is-opened' : ''
            }`
          : ''
      }`}
    >
      {headings.map((heading, index) => {
        const hasSubHeading = heading.subHeadings.length > 0;

        return (
          <React.Fragment key={index}>
            <li>
              <button
                className={`c-table-of-content__item ${
                  activeIndex === heading.index ? 'is-active' : ''
                }`}
                // style={{
                //   paddingLeft: `${(heading.level - 2) * 12 + 8}px`,
                // }}
                onClick={(event) => {
                  handleClick(heading.element, heading.index, event);
                }}
              >
                <span>
                  <span style={{ flex: 1 }}>{heading.text}</span>
                  {hasSubHeading ? (
                    <svg 
                      onClick={(event) => {
                        toggleCollapseItem(event);
                      }}
                      className={`chevron exclude-click${
                        openIndexes === heading.index ? '' : ' chevron-down'
                      }`} 
                      xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#002729" d="M13.354 10.354a.502.502 0 0 1-.707 0L8 5.707l-4.646 4.647a.5.5 0 0 1-.707-.708l5-5a.5.5 0 0 1 .707 0l5 5a.5.5 0 0 1 0 .708Z"/></svg>
                      ) : null}
                </span>
              </button>
              {hasSubHeading ? (
              <ul>
                <TableOfContentItems
                  headings={heading.subHeadings}
                  onClose={onClose}
                  activeIndex={activeIndex}
                  openIndexes={openIndexes}
                  isSub
                  onActiveIndexChange={onActiveIndexChange}
                />
              </ul>
            ) : null}
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default TableOfContentItems;
