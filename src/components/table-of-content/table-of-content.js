import React, { useCallback, useEffect, useRef, useState } from 'react';
import TableOfContentItems from './items/table-of-content-items';

const TableOfContents = ({
  selector = 'body',
  isSticky = true,
  footer = null,
}) => {
  const [headings, setHeadings] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [openIndexes, setOpenIndexes] = useState(null);
  const headingsRef = useRef(headings);

  const lastScrollTop = useRef(0);
  const counterRef = useRef(1);

  useEffect(() => {
    headingsRef.current = headings;
  }, [headings]);

  const getScrollDirectionOnScroll = useCallback(() => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop < 330) {
      document.querySelector('.c-table-of-content').classList.add('is-hide');
    } else {
      document.querySelector('.c-table-of-content').classList.remove('is-hide');
    }

    if (scrollTop > lastScrollTop.current) {
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

    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }, []);

  const findHeading = useCallback((headingData, index) => {
    for (let i = 0; i < headingData.length; i++) {
      if (headingData[i].index === index) {
        return headingData[i];
      }

      if (headingData[i].subHeadings.length > 0) {
        const data = findHeading(headingData[i].subHeadings, index);

        if (data) {
          return data;
        }
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    const headingElements = Array.from(
      document.querySelectorAll(
        `${selector} h1, ${selector} h2, ${selector} h3, ${selector} h4, ${selector} h5, ${selector} h6`
      )
    );
    const offset = 0;

    getScrollDirectionOnScroll();

    for (let i = 0; i < headingElements.length; i++) {
      const rect = headingElements[i].getBoundingClientRect();

      if (rect.top < offset && rect.bottom > 0) {
        setActiveIndex(i + 1);

        const headingData = findHeading(headingsRef.current, i + 1);

        setOpenIndexes(headingData.parentIndex);
      } else if (rect.top > offset) {
        break; // Stop the loop once we find a heading that hasn't reached the offset yet
      }
    }
  }, [findHeading, selector, getScrollDirectionOnScroll]);

  const buildTreeRecursive = useCallback(
    (elements, level = 1, parentIndex = 0) => {
      const result = [];

      while (elements.length > 0) {
        const current = elements.shift();
        const currentLevel = parseInt(current.tagName[1], 10);

        if (currentLevel === level) {
          const newElement = {
            index: counterRef.current++,
            parentIndex,
            element: current,
            level,
            text: current.textContent,
            subHeadings: [],
          };
          newElement.subHeadings = buildTreeRecursive(
            elements,
            level + 1,
            newElement.index
          );
          result.push(newElement);
        } else {
          elements.unshift(current);
          break;
        }
      }

      return result;
    },
    []
  );

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll(
        `${selector} h1, ${selector} h2, ${selector} h3, ${selector} h4, ${selector} h5, ${selector} h6`
      )
    );

    const firstItemLevel = parseInt(headingElements[0].tagName[1], 10);
    const headingData = buildTreeRecursive(headingElements, firstItemLevel);

    setHeadings(headingData);

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [selector, buildTreeRecursive, handleScroll]);

  const openCloseToc = () => {
    const { clientWidth } = document.documentElement;

    if (clientWidth <= 992) {
      const doc = document.getElementById('toc-collapsible-list');
      const chevron = document.getElementById('chevron-icon');

      document.documentElement.classList.toggle('no-scroll');
      chevron.classList.toggle('chevron-down');
      doc.classList.toggle('is-opened');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  };

  return (
    <nav
      className={`c-table-of-content${isSticky ? ' is-sticky' : ''}`}
      aria-label="Table of Contents"
    >
      <button
        className="c-table-of-content__title"
        onClick={() => {
          openCloseToc();
        }}
      >
        Table of Content
        <svg xmlns="http://www.w3.org/2000/svg" width="16" id="chevron-icon" className="chevron chevron-down" fill="none" viewBox="0 0 16 16"><path fill="#798686" d="M13.354 10.354a.502.502 0 0 1-.707 0L8 5.707l-4.646 4.647a.5.5 0 0 1-.707-.708l5-5a.5.5 0 0 1 .707 0l5 5a.5.5 0 0 1 0 .708Z"/></svg>
      </button>
      <div
        id="toc-collapsible-list"
        className="collapsible-on-mobile is-collapsed c-table-of-content__menu"
      >
        <TableOfContentItems
          headings={headings}
          activeIndex={activeIndex}
          openIndexes={openIndexes}
          onActiveIndexChange={(index) => {
            setActiveIndex(index);
          }}
          onClose={() => {
            openCloseToc();
          }}
        />
      </div>
      {footer ? <hr className="c-table-of-content__separator" /> : null}
      {footer}
    </nav>
  );
};

export default TableOfContents;
