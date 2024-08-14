import React from 'react';

const TableOfContentItems = ({
  headings = [],
  onClose,
  isSub,
  activeIndex,
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
      window.innerWidth <= 768
        ? direction === 'up'
          ? 120
          : 48
        : direction === 'up'
        ? 70
        : 0;

    window.scrollTo({
      top: targetScrollTop - offset,
      behavior: window.innerWidth <= 768 ? 'instant' : 'smooth',
    });
  }

  const handleClick = (element, index, event) => {
    if (
      event.target.classList.contains('exclude-click') ||
      event.target.closest('.exclude-click')
    ) {
      let nextCollapsible = event.target.closest('li').nextElementSibling;

      console.log({ nextCollapsible });

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

    if (
      (!!nextCollapsible.style.maxHeight &&
        nextCollapsible.style.maxHeight !== '0px') ||
      nextCollapsible.classList.contains('is-opened')
    ) {
      nextCollapsible.style.maxHeight = 0;
    } else {
      nextCollapsible.style.maxHeight = nextCollapsible.scrollHeight + 'px';
    }

    nextCollapsible.classList.toggle('is-opened');
    event.target.closest('svg').classList.toggle('chevron-down');
  };

  return (
    <ul
      id={headings[0]?.text}
      className={`c-table-of-content__list${
        isSub ? ' collapsible is-opened' : ''
      }`}
    >
      {headings.map((heading, index) => {
        const hasSubHeading = heading.subHeadings.length > 0;

        return (
          <>
            <li
              className={`c-table-of-content__item ${
                activeIndex === heading.index ? 'is-active' : ''
              }`}
              key={index}
              style={{
                paddingLeft: `${(heading.level - 2) * 12 + 32}px`,
              }}
              onClick={(event) => {
                handleClick(heading.element, heading.index, event);
              }}
            >
              <span>
                {heading.level % 2 === 0 ? (
                  <svg
                    className="dot-icon"
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="6" height="6" rx="3" fill="#798686" />
                  </svg>
                ) : (
                  <svg
                    className="dot-icon"
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="5"
                      height="5"
                      rx="2.5"
                      fill="#798686"
                    />
                    <rect
                      className="no-change-rect"
                      x="1"
                      y="1"
                      width="4"
                      height="4"
                      rx="2"
                      fill="white"
                    />
                  </svg>
                )}
                <span style={{ flex: 1 }}>{heading.text}</span>
                {hasSubHeading ? (
                  <svg
                    onClick={(event) => {
                      toggleCollapseItem(event);
                    }}
                    className="chevron exclude-click"
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.354 6.35366C11.3076 6.40014 11.2524 6.43702 11.1917 6.46219C11.131 6.48735 11.066 6.5003 11.0003 6.5003C10.9346 6.5003 10.8695 6.48735 10.8088 6.46219C10.7481 6.43702 10.693 6.40014 10.6465 6.35366L6.00028 1.70678L1.35403 6.35366C1.26021 6.44748 1.13296 6.50018 1.00028 6.50018C0.867596 6.50018 0.740348 6.44748 0.646528 6.35366C0.552708 6.25984 0.5 6.13259 0.5 5.99991C0.5 5.86722 0.552708 5.73998 0.646528 5.64615L5.64653 0.646155C5.69296 0.599667 5.74811 0.562787 5.80881 0.537625C5.86951 0.512463 5.93457 0.499512 6.00028 0.499512C6.06599 0.499512 6.13105 0.512463 6.19175 0.537625C6.25245 0.562787 6.30759 0.599667 6.35403 0.646155L11.354 5.64615C11.4005 5.69259 11.4374 5.74774 11.4626 5.80843C11.4877 5.86913 11.5007 5.9342 11.5007 5.99991C11.5007 6.06561 11.4877 6.13068 11.4626 6.19138C11.4374 6.25207 11.4005 6.30722 11.354 6.35366Z"
                      fill="black"
                    />
                  </svg>
                ) : null}
              </span>
            </li>
            {hasSubHeading ? (
              <li>
                <TableOfContentItems
                  headings={heading.subHeadings}
                  onClose={onClose}
                  activeIndex={activeIndex}
                  isSub
                />
              </li>
            ) : null}
          </>
        );
      })}
    </ul>
  );
};

export default TableOfContentItems;
