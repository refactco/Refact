import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import ContainerBox from '../container-box/container-box';

const Faq = ({ items }) => {
  const [activeIndices, setActiveIndices] = useState([]);
  const handleFaqClick = (index) => {
    setActiveIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((item) => item !== index)
        : [...prevIndices, index]
    );
  };

  useEffect(() => {
    const updateMaxHeight = () => {
      activeIndices.forEach((index) => {
        const answerElement = document.getElementById(`answer-${index}`);
        if (answerElement) {
          answerElement.style.maxHeight = `${answerElement.scrollHeight}px`;
        }
      });

      items.forEach((faq, index) => {
        if (!activeIndices.includes(index)) {
          const answerElement = document.getElementById(`answer-${index}`);
          if (answerElement) {
            answerElement.style.maxHeight = '0';
          }
        }
      });
    };

    updateMaxHeight();
  }, [activeIndices, items]);

  return (
    <ContainerBox className="c-service-faq">
      <div className="c-service-faq__wrapper">
        <div className="c-service-faq__title-section">
          <div className="c-service-faq__content">
            <h2 className="c-service-faq__title">FAQs</h2>
            <p className="c-service-faq__description">
              Frequently asked questions ordered by popularity. Remember that if
              the visitor has not committed to the call to action, they may
              still have questions (doubts) that can be answered.
            </p>
          </div>
          <div className="c-service-faq__cta">
            <Link to="/contact" className='c-btn--secondary'>
              Contact Us 
            <svg
              width="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#59CC51" />
              <path
                d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                fill="white"
              />
            </svg>
            </Link>
          </div>
        </div>
        <div className="c-service-faq__accordion">
          {items.map((faq, index) => (
            <>
              <div
                className={`c-service-faq__item ${
                  activeIndices.includes(index) ? 'is-active' : ''
                }`}
                key={index}
              >
                <div className="c-service-faq__divider"></div>
                <button
                  className={`c-service-faq__item-button ${
                    activeIndices.includes(index) ? 'is-active' : ''
                  }`}
                  onClick={() => {
                    handleFaqClick(index);
                  }}
                >
                  <span className="c-service-faq__question">
                    {faq.question}
                  </span>
                  <div className="c-service-faq__icon">
                    <svg
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Icon">
                        <path
                          id="Vector"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.5283 20.9923C16.2354 21.2852 15.7606 21.2852 15.4677 20.9923L7.82123 13.3458C7.52834 13.0529 7.52834 12.5781 7.82123 12.2852L8.17479 11.9316C8.46768 11.6387 8.94255 11.6387 9.23545 11.9316L15.998 18.6942L22.7606 11.9316C23.0535 11.6387 23.5283 11.6387 23.8212 11.9316L24.1748 12.2852C24.4677 12.5781 24.4677 13.0529 24.1748 13.3458L16.5283 20.9923Z"
                          fill="#002729"
                        />
                      </g>
                    </svg>
                  </div>
                </button>
                <div
                  id={`answer-${index}`}
                  className="c-service-faq__answer"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                ></div>
                {index + 1 === items.length ? (
                  <div className="c-service-faq__divider"></div>
                ) : null}
              </div>
            </>
          ))}
        </div>
      </div>
    </ContainerBox>
  );
};

export default Faq;
