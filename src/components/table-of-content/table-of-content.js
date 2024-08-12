import React, { useEffect, useState } from 'react';
import TableOfContentItems from './items/table-of-content-items';

const TableOfContents = ({
  selector = 'body',
  isSticky = true,
  footer = null,
}) => {
  const [headings, setHeadings] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  let lastScrollTop = 0;

  const getScrollDirectionOnScroll = () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop < 330) {
      document.querySelector('.c-table-of-content').classList.add('is-hide');
    } else {
      document.querySelector('.c-table-of-content').classList.remove('is-hide');
    }

    if (scrollTop > lastScrollTop) {
      document.querySelector('.c-table-of-content').classList.add('up-to-down');
      document
        .querySelector('.c-table-of-content')
        .classList.remove('down-to-up');
    } else {
      document.querySelector('.c-table-of-content').classList.add('down-to-up');
      document
        .querySelector('.c-table-of-content')
        .classList.remove('up-to-down');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  };

  const handleScroll = () => {
    // let newActiveIndex = null;
    const offset = 0; // Adjust this value as needed to change the activation point relative to the top of the viewport

    const ss = getScrollDirectionOnScroll();

    console.log({ ss });

    for (let i = 0; i < headings.length; i++) {
      const rect = headings[i].element.getBoundingClientRect();
      if (rect.top < offset && rect.bottom > 0) {
        // console.log({ rect });
        // newActiveIndex = i; // Set the new active heading index as the one that enters the offset area
        setActiveIndex(i);
      } else if (rect.top > offset) {
        break; // Stop the loop once we find a heading that hasn't reached the offset yet
      }
    }
  };

  function buildTreeRecursive(elements, level = 1) {
    const result = [];

    console.log({ elements });

    while (elements.length > 0) {
      const current = elements.shift();
      const currentLevel = parseInt(current.tagName[1], 10);

      if (currentLevel === level) {
        const newElement = {
          element: current,
          level,
          text: current.textContent,
          subHeadings: [],
        };
        newElement.subHeadings = buildTreeRecursive(elements, level + 1);
        result.push(newElement);
      } else {
        elements.unshift(current);
        break;
      }
    }

    return result;
  }

  useEffect(() => {
    console.log({ selector });
    const headingElements = Array.from(
      document.querySelectorAll(
        `${selector} h1, ${selector} h2, ${selector} h3, ${selector} h4, ${selector} h5, ${selector} h6`
      )
    );

    const firstItemLevel = parseInt(headingElements[0].tagName[1], 10);
    const headingData = buildTreeRecursive(headingElements, firstItemLevel);

    console.log({ headingData });

    // headingElements.forEach((element, index) => {
    //   const level = parseInt(element.tagName[1], 10);
    //   const previousHeading = headingData[index - 1];
    //   const nextHeading = headings[index + 1];
    //   const hasSubHeading =
    //           nextHeading && nextHeading.level > level;

    //   if (!previousHeading || level <= previousHeading.level) {
    //     headingData.push({
    //       text: element.textContent,
    //       level,
    //       element,
    //       hasSubHeading,
    //       subHeading: has[]
    //     });
    //   } else {

    //   }
    //     {
    //       text: element.textContent,
    //       level: parseInt(element.tagName[1], 10),
    //       element: element,
    //     }
    // });

    setHeadings(headingData);

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function getScrollDirection(targetScrollTop) {
    let result = '';
    const currentScrollTop = document.documentElement.scrollTop;

    // console.log({ targetScrollTop, lastScrollTop });
    if (targetScrollTop > currentScrollTop) {
      // Downscroll
      result = 'down';
    } else {
      // Upscroll
      result = 'up';
    }

    // setLastScrollTop(targetScrollTop);

    return result;
  }

  function scrollToElementWithOffset(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;
    const targetScrollTop = rect.top + scrollTop;

    const direction = getScrollDirection(targetScrollTop);
    const offset = window.innerWidth <= 768 ? 72 : direction === 'up' ? 70 : 0;

    window.scrollTo({
      top: targetScrollTop - offset,
      behavior: window.innerWidth <= 768 ? 'instant' : 'smooth',
    });
  }

  const openCloseToc = () => {
    const { clientWidth } = document.documentElement;

    if (clientWidth <= 768) {
      const doc = document.getElementById('toc-collapsible-list');
      const chevron = document.getElementById('chevron-icon');

      document.documentElement.classList.toggle('no-scroll');
      chevron.classList.toggle('chevron-down');
      doc.classList.toggle('is-collapsed');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  };

  // const handleClick = (element, index) => {
  //   openCloseToc();
  //   scrollToElementWithOffset(element);
  //   setActiveIndex(index);
  // };

  return (
    <nav
      className={`c-table-of-content${isSticky ? ' is-sticky' : ''}`}
      aria-label="Table of Contents"
    >
      <p
        className="c-table-of-content__title"
        onClick={() => {
          openCloseToc();
        }}
      >
        Table of Content
        <svg
          id="chevron-icon"
          className="chevron chevron-down"
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
      </p>
      <div
        id="toc-collapsible-list"
        className="collapsible-on-mobile is-collapsed"
      >
        <TableOfContentItems
          headings={headings}
          onClose={() => {
            openCloseToc();
          }}
        />
        {/* <ul className="c-table-of-content__list">
          {headings.map((heading, index) => {
            // const nextHeading = headings[index + 1];
            const hasSubHeading = heading.subHeadings.length > 0;

            return (
              <li
                className={`c-table-of-content__item ${
                  activeIndex === index ? 'is-active' : ''
                }`}
                key={index}
                style={{
                  paddingLeft: `${(heading.level - 2) * 12 + 32}px`,
                }}
                onClick={() => handleClick(heading.element, index)}
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
                  {heading.text}
                  {hasSubHeading ? (
                    <svg
                      className="chevron chevron-down"
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
            );
          })}
        </ul> */}
      </div>
      {footer ? <hr className="c-table-of-content__separator" /> : null}
      {footer}
    </nav>
  );
};

export default TableOfContents;
