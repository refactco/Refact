import React, { useState, useEffect, useId } from 'react';
import { motion } from 'framer-motion';

type ToolResourceItem = {
  title: string;
  description: string;
  svg: string;
};

type GoodTechData = {
  list: ToolResourceItem[];
};

type GoodTechProps = {
  data: GoodTechData;
};

const GoodTech: React.FC<GoodTechProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<number>(0); // Type the state as `number`

  const [activeIndices, setActiveIndices] = useState([0]);
  const uniqueId = useId(); 
  // Function to handle FAQ click events
  const handleFaqClick = (index) => {
    setActiveIndices((prevIndices) =>
      prevIndices.includes(index) ? [] : [index]
    );
    // setActiveIndices((prevIndices) =>
    //   prevIndices.includes(index)
    //     ? prevIndices.filter((item) => item !== index)
    //     : [...prevIndices, index]
    // );
  };

  // Effect to update the max height of FAQ answers
  useEffect(() => {
    const updateMaxHeight = () => {
      activeIndices.forEach((index) => {
        const answerElement = document.getElementById(`${uniqueId}-answer-${index}`);
        if (answerElement) {
          answerElement.style.maxHeight = `${answerElement.scrollHeight}px`;
        }
      });

      data.list.forEach((faq, index) => {
        if (!activeIndices.includes(index)) {
          const answerElement = document.getElementById(`${uniqueId}-answer-${index}`);
          if (answerElement) {
            answerElement.style.maxHeight = "0";
          }
        }
      });
    };

    updateMaxHeight();
  }, [activeIndices]);

  return (
    <div className="c-goodteach-content">

      <div className="c-goodteach-tabs">
        {/* Sidebar for Tabs */}
        <div className="c-goodteach-tabs__items">
          {data.list.map((item, index) => (
            <button
              key={`${uniqueId}-${index}`}
              className={`c-goodteach-tabs-item ${activeTab === index ? 'is-active' : ''}`}
              onClick={() => setActiveTab(index)}
              title={item.title}
            >
              <span>{item.title}</span>
              <div className='c-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 6 12 12M18 8.25V18H8.25"/></svg>
              </div>
            </button>
          ))}
        </div>

        {/* Display Content */}
        <motion.div
          className="c-goodteach-tabs__content"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className='c-icon' dangerouslySetInnerHTML={{ __html: data.list[activeTab].svg }} />
          <div className='c-goodtech-tabs-text c-goodtech-tabs__title' dangerouslySetInnerHTML={{ __html: data.list[activeTab].title }} />
          <div className='c-goodtech-tabs-text c-goodtech-tabs__text' dangerouslySetInnerHTML={{ __html: data.list[activeTab].description }} />
        </motion.div>
      </div>
      {/* Mobile View: FAQ Style */}
      <div className="c-goodteach-list">
        {data.list.map((item, index) => (
          <div
            className={`c-goodteach-list__items ${activeIndices.includes(index) ? "is-active" : ""}`}
            key={`${uniqueId}-${index}`}
          >
            <button
              className={`c-goodteach-tabs-item js-faq-list ${
                activeIndices.includes(index) ? "is-active" : ""
              }`}
              onClick={() => handleFaqClick(index)}
            >
              <span>{item.title}</span>
              <div className='c-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 6 12 12M18 8.25V18H8.25"/></svg>
              </div>
            </button>
            <div
              id={`${uniqueId}-answer-${index}`}
              className="c-goodtech-tabs-text c-goodtech-tabs__text"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoodTech;
