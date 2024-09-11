import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"
import Layout from "../components/layout/layout"
import CampaignURLGenerator from "../components/campaign-url-generator/campaign-url-generator"
import PatternBg from "../components/patterns/pattern-bg"

const UrlBuilder = ({data}) => {
  const urlBuilder = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = urlBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader');
  const textSections = urlBuilder.filter(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_TextSection'
  );
  const faqsSection = urlBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Faqs');
  const tableSection = urlBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Table');

  const insertTableAtIndex = 1;
  textSections.splice(insertTableAtIndex, 0, tableSection);
  const [activeIndices, setActiveIndices] = useState([0]);

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

  useEffect(() => {
    const updateMaxHeight = () => {
      activeIndices.forEach((index) => {
        const answerElement = document.getElementById(`answer-${index}`);
        if (answerElement) {
          answerElement.style.maxHeight = `${answerElement.scrollHeight}px`;
        }
      });

      faqsSection.list.forEach((faq, index) => {
        if (!activeIndices.includes(index)) {
          const answerElement = document.getElementById(`answer-${index}`);
          if (answerElement) {
            answerElement.style.maxHeight = "0";
          }
        }
      });
    };

    updateMaxHeight();
  }, [activeIndices, faqsSection.list]);
  return (
    <Layout>
      {heroSection && (
        <ContainerBox className="c-section--work is-url-builder">
        <div className="c-page-header">
          <h1 className="c-page-header__title">
            {heroSection.title}
          </h1>
          <div className="c-page-header__text" dangerouslySetInnerHTML={{__html:heroSection.text}}></div>
        </div>
        <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
        <PatternBg pattern="pagePattern" className='is-page-pattern' />
      </ContainerBox>
      )}
      <CampaignURLGenerator />
      {textSections.map((section, index) => (
        <ContainerBox
          key={index}
          className={`c-section--text ${index === 1 ? 'is-section--table' : ''} ${index === 2 ? 'is-section--final' : ''}`}
        >
          {section.fieldGroupName ===
          'Template_PageBuilder_Pagebuilder_PageBuilder_Table' ? (
            <div className="c-table">
              <div className="c-table__title">{section.title}</div>
              <div className="c-table__description">
                {section.description}
              </div>
              <table className="c-table__content">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Example</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {section.tableContent.map((row, index) => (
                    <tr key={index}>
                      <td data-label="Parameter" aria-label="Parameter">
                        <div className="c-table-parameter" dangerouslySetInnerHTML={{__html:row.parameter}}></div>
                      </td>
                      <td data-label="Example">{row.example}</td>
                      <td data-label="Required">{row.required ? 'Yes' : 'No'}</td>
                      <td data-label="Description">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Render text section
            <div className="c-text">
              {section.description && (
                <div
                  className="c-text__description s-content"
                  dangerouslySetInnerHTML={{ __html: section.description }}
                ></div>
              )}
            </div>
          )}
        </ContainerBox>
      ))}
      {faqsSection && (
        <ContainerBox className="c-section--faqs">
          <div className="c-section c-section--center">
            <h2 className="c-section__title">FAQs</h2>
          </div>
          <div className="c-faqs">
          {faqsSection.list.map((faq, index) => (
            <div
              className={`c-faq__items ${activeIndices.includes(index) ? "is-active" : ""}`}
              key={index}
            >
              <button
                className={`c-faq__question js-faq-list ${
                  activeIndices.includes(index) ? "is-active" : ""
                }`}
                onClick={() => handleFaqClick(index)}
              >
                <span>{faq.question}</span>
                <div className="c-faq-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    className="icon icon-more"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 13H13V21H11V13H3V11H11V3H13V11H21V13Z"
                      fill="#002729"
                    />
                    <path d="M3 11H21V13H3V11Z" fill="#002729" />
                  </svg>
                </div>
              </button>
              <div
                id={`answer-${index}`}
                className="c-faq__answer"
              >
                {faq.answer}
              </div>
            </div>
          ))}
          </div>
        </ContainerBox>
      )}
    </Layout>
  )
}

export default UrlBuilder

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} />
    </>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "campaign-url-builder"}) {
      id
      content
      seo {
        title
        metaDesc
      }
      template {
        ... on WpTemplate_PageBuilder {
          templateName
          pageBuilder {
            fieldGroupName
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                fieldGroupName
                title
                text
                subtitle
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                description
                fieldGroupName
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                fieldGroupName
                list {
                  answer
                  fieldGroupName
                  question
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Table {
                description
                fieldGroupName
                title
                tableContent {
                  description
                  example
                  fieldGroupName
                  parameter
                  required
                }
              }
            }
          }
        }
      }
    }
  }
`