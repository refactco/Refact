import { graphql } from 'gatsby';
import React, { useState, useEffect } from 'react';
import Layout from "../components/layout/layout";
import ContainerBox from '../components/container-box/container-box';
import Seo from '../components/seo/seo';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import PatternBg from '../components/patterns/pattern-bg';
import Button, {BgMode, BtnType} from '../components/button/button';
import GoodTech from '../components/good-tech/goodtech';


const ServicesPage = ({ data }) => {
  const pageBuilder = data.wpPage.template.pageBuilder.pageBuilder;
  // State to track which FAQ items are active
  const [activeIndices, setActiveIndices] = useState([0]);

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
        const answerElement = document.getElementById(`answer-${index}`);
        if (answerElement) {
          answerElement.style.maxHeight = `${answerElement.scrollHeight}px`;
        }
      });

      pageBuilder.forEach((section) => {
        if (section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Faqs') {
          section.list.forEach((faq, index) => {
            if (!activeIndices.includes(index)) {
              const answerElement = document.getElementById(`answer-${index}`);
              if (answerElement) {
                answerElement.style.maxHeight = "0";
              }
            }
          });
        }
      });
    };

    updateMaxHeight();
  }, [activeIndices, pageBuilder]);
  const renderSection = (section, index) => {
    switch (section.fieldGroupName) {
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Spacer':
        return (
          <ContainerBox key={index} className={`c-section--spacer c-section--spacer-${index}`}>
            <div className="c-spacer"></div>
            <style>
              {`
                .c-section--spacer-${index} .c-spacer {
                  height: ${section.mobile}rem;
                }
                @media (min-width: 992px) {
                  .c-section--spacer-${index} .c-spacer {
                    height: ${section.desktop}rem;
                  }
                }
              `}
            </style>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader':
        return (
          <ContainerBox key={index} className="c-section--work c-section--services">
          <div className="c-page-header is-full">
            <h1 className="c-page-header__title">
              {section.title}
            </h1>
            <div
              className="c-page-header__text"
              dangerouslySetInnerHTML={{ __html: section.text }}
              style={{ maxWidth: 796 }}
            ></div>
          </div>
          <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
          <PatternBg pattern="heroPatternBig" className='is-hero-pattern-big' />
        </ContainerBox>
        )
        case 'Template_PageBuilder_Pagebuilder_PageBuilder_CapabilitiesList':
          return (
            <ContainerBox key={index} className="c-section--capabilites has-services">
              <div className="c-capabilites">
                <div className='c-section'>
                  <h2 className="c-section__title">Our Services</h2>
                </div>
                {section.list && (
                  <div className="c-sf__list">
                    {section.list.map((item, index) => (
                      <div className="c-capabilites-list__items"  key={index}>
                        <div className='c-capabilites-list__info'>
                          <div className="c-sf__num">0{index+1}</div>
                          <div className="c-sf__title">{item.title}</div>
                          <div className="c-sf__text" dangerouslySetInnerHTML={{__html: item.text}} />
                        </div>
                        {item.cta && (
                          <Button
                          url={item.cta.url}
                          text={item.cta.title}
                          title={item.title}
                          type={BtnType.SECONDARY}
                          bgMode={BgMode.LIGHT}
                        />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ContainerBox>
          )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextSection':
        return (
          <ContainerBox key={index} className="c-section--capabilites is-text-section">
            <div className="c-capabilites">
              <div className='c-section mb-0' style={{maxWidth: 768}}>
                {section.title && (
                  <h2 className="c-section__title">{section.title}</h2>
                )}
                {section.description && (
                  <div className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}} />
                )}
              </div>
            </div>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites':
        const settings = {
          centerMode: true,
          infinite: true,
          arrows: false,
          dots: false,
          autoplay: true,
          variableWidth: true,
          speed: 500
        };
        return (
          <ContainerBox key={index} className="c-section--challenge">
            <div className="c-challenge">
              <div className="c-section is-center">
                <h2 className="c-section__title">{section.title}</h2>
              </div>
              <div className="c-challenge__list">
                <Slider {...settings} className="c-challenge-slider js-challenge-slider">
                  {section.items.map((item, index) => (
                    <div className="c-challenge__items" key={index}>
                      {item.title}
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="c-section">
                <div className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}} />
              </div>
            </div>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_ToolsResources':
        return (
          <ContainerBox key={index} className="c-section--goodtech">
            <div className='c-goodtech'>
              <div className='c-section is-white'>
                <h2 className="c-section__title" dangerouslySetInnerHTML={{__html:section.title}} />
              </div>
              <GoodTech data={section} icon={true} theme='Dark' />
            </div>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_CtaSection':
        return (
          <ContainerBox key={index} className="c-section--inline-cta">
            <div className="c-inline-cta">
              <p>{section.title}</p>
              <Button
                url={section.button.url}
                text={section.button.title}
                title={section.title}
                type={BtnType.SECONDARY}
                bgMode={BgMode.DARK}
              />
            </div>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextButton':
        return (
          <ContainerBox key={index} className={`c-section--our-partners is-industry-expert`}>
          <div className="c-our-partners">
            <div className='c-section is-center'>
              {section.title && (
              <h2 className='c-section__title'>{section.title}</h2>
              )}
              {section.description && (
              <div className='c-section__desc' dangerouslySetInnerHTML={{__html:section.description}} />
              )}
              {section.cta && (
                <div className='c-section__cta'>
                  <Button 
                    target={section.cta.target} 
                    url={section.cta.url} 
                    text={section.cta.title} 
                    type={BtnType.PRIMARY} 
                    bgMode={BgMode.LIGHT} 
                  />
                </div>
              )}
            </div>
          </div>
          <PatternBg pattern="lightTop" className='is-our-partners' />
        </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Faqs':
        return (
          <ContainerBox key={index} className={`c-section--faq is-about-page`}>
            <div className="c-faq">
              <div className='c-faq__col'>
                <div className='c-section'>
                  <h2 className="c-section__title">FAQs</h2>
                  <div className='c-sf__cta'>
                    <Button 
                      url="/toolkit"
                      text="Learn More About Our Tech"
                      type={BtnType.SECONDARY} 
                      bgMode={BgMode.LIGHT} 
                    />
                  </div>
                </div>
              </div>
              <div className='c-faq__col'>
                <div className='c-faq__list'>
                {section.list.map((faq, index) => (
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 33"><path fill="#002729" fillRule="evenodd" d="M16.53 21.54a.75.75 0 0 1-1.06 0l-7.647-7.646a.75.75 0 0 1 0-1.061l.354-.354a.75.75 0 0 1 1.06 0L16 19.242l6.763-6.763a.75.75 0 0 1 1.06 0l.354.354a.75.75 0 0 1 0 1.06L16.53 21.54Z" clipRule="evenodd"/></svg>
                      </div>
                    </button>
                    <div
                      id={`answer-${index}`}
                      className="c-faq__answer"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                ))}
                </div>
                <div className='c-sf__cta'>
                  <Button 
                    url="/toolkit"
                    text="Learn More About Our Tech"
                    type={BtnType.SECONDARY} 
                    bgMode={BgMode.LIGHT} 
                  />
                </div>
              </div>
            </div>
            <PatternBg pattern="lightLeft" className='is-pattern-client' />
          </ContainerBox>
        )
        case 'Template_PageBuilder_Pagebuilder_PageBuilder_Testimonials':
          return (
            <ContainerBox key={index} className="c-section--t-list">
              <div className="c-testimonials">
                <div className='c-section is-center'>
                  <h2 className="c-section__title">{section.title}</h2>
                </div>
                <div className="c-t-list">
                  {section.testimonialsList.map((testimonial, index) => (
                    <div className="c-t-list__items" key={index}>
                      <div className="c-t-list__content">
                        <div className='c-t-list__stars'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="121" height="19" fill="none" viewBox="0 0 121 19"><path fill={`url(#star-a-${index})`} d="m9.824.232 2.697 5.484 6.03.88a.415.415 0 0 1 .23.708l-4.363 4.268 1.03 6.027a.413.413 0 0 1-.6.438L9.454 15.19 4.06 18.038a.414.414 0 0 1-.6-.437l1.03-6.03L.124 7.305a.416.416 0 0 1 .23-.708l6.03-.88L9.084.232a.411.411 0 0 1 .74 0Z"/><path fill={`url(#star-b-${index})`} d="m35.347.232 2.698 5.484 6.03.88a.416.416 0 0 1 .23.708l-4.363 4.268 1.03 6.027a.415.415 0 0 1-.6.438l-5.395-2.846-5.394 2.847a.414.414 0 0 1-.6-.437l1.03-6.03-4.365-4.267a.416.416 0 0 1 .23-.708l6.03-.88 2.7-5.484a.412.412 0 0 1 .74 0Z"/><path fill={`url(#star-c-${index})`} d="m60.87.232 2.698 5.484 6.03.88a.416.416 0 0 1 .23.708l-4.363 4.268 1.03 6.027a.414.414 0 0 1-.6.438L60.5 15.19l-5.395 2.847a.414.414 0 0 1-.6-.437l1.03-6.03-4.364-4.267a.415.415 0 0 1 .23-.708l6.03-.88L60.13.232a.41.41 0 0 1 .74 0Z"/><path fill={`url(#star-d-${index})`} d="m86.394.232 2.698 5.484 6.03.88a.415.415 0 0 1 .23.708l-4.363 4.268 1.03 6.027a.414.414 0 0 1-.6.438l-5.395-2.846-5.394 2.847a.414.414 0 0 1-.6-.437l1.03-6.03-4.365-4.267a.416.416 0 0 1 .23-.708l6.03-.88 2.7-5.484a.411.411 0 0 1 .739 0Z"/><path fill={`url(#star-e-${index})`} d="m111.917.232 2.698 5.484 6.031.88a.416.416 0 0 1 .229.708l-4.363 4.268 1.03 6.027a.417.417 0 0 1-.164.406.41.41 0 0 1-.436.032l-5.395-2.846-5.394 2.847a.411.411 0 0 1-.576-.211.407.407 0 0 1-.024-.226l1.03-6.03-4.364-4.267a.414.414 0 0 1 .022-.614.416.416 0 0 1 .207-.094l6.031-.88 2.699-5.484a.408.408 0 0 1 .588-.17c.065.042.118.1.151.17Z"/><defs><linearGradient id={`star-a-${index}`} x1="9.453" x2="9.453" y1="0" y2="18.085" gradientUnits="userSpaceOnUse"><stop stop-color="#31A329"/><stop offset="1" stop-color="#20731A"/></linearGradient><linearGradient id={`star-b-${index}`} x1="34.977" x2="34.977" y1="0" y2="18.085" gradientUnits="userSpaceOnUse"><stop stop-color="#31A329"/><stop offset="1" stop-color="#20731A"/></linearGradient><linearGradient id={`star-c-${index}`} x1="60.5" x2="60.5" y1="0" y2="18.085" gradientUnits="userSpaceOnUse"><stop stop-color="#31A329"/><stop offset="1" stop-color="#20731A"/></linearGradient><linearGradient id={`star-d-${index}`} x1="86.023" x2="86.023" y1="0" y2="18.085" gradientUnits="userSpaceOnUse"><stop stop-color="#31A329"/><stop offset="1" stop-color="#20731A"/></linearGradient><linearGradient id={`star-e-${index}`} x1="111.547" x2="111.547" y1="0" y2="18.085" gradientUnits="userSpaceOnUse"><stop stop-color="#31A329"/><stop offset="1" stop-color="#20731A"/></linearGradient></defs></svg>
                        </div>
                        <div className="c-t-list__text">{testimonial.text}</div>
                      </div>
                      <div className="c-t-list__author">
                        {testimonial.logo && (
                          <div className="c-t-author__img" dangerouslySetInnerHTML={{__html:testimonial.logo}} />
                        )}
                        <div className='c-t-author__info'>
                          <div className="c-t-author__text is-name">{testimonial.name}</div>
                          <div className="c-t-author__text is-position">{testimonial.position}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ContainerBox>
          )
      default:
        return null
    }
  }
  const backtobasicContent = data.wpPage.template.pageBuilder.pageBuilder;
  return (
    <Layout>
      {backtobasicContent.map((section, index) => (
          renderSection(section, index)
      ))}
    </Layout>
  );
};

export default ServicesPage;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} featuredImage={post.seo.opengraphImage.localFile.url} />
    </>
  );
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "services"}) {
      id
      seo {
        title
        metaDesc
        opengraphImage {
          localFile {
            url
          }
        }
      }
      template {
        ... on WpTemplate_PageBuilder {
          templateName
          pageBuilder {
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                fieldGroupName
                subtitle
                text
                title
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                description
                fieldGroupName
                images {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                title
                subHeading
                moreFeatures
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                desktop
                fieldGroupName
                mobile
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextButton {
                description
                fieldGroupName
                title
                cta {
                  url
                  title
                  target
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonials {
                fieldGroupName
                title
                testimonialsList {
                  text
                  name
                  position
                  logo
                  fieldGroupName
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CapabilitiesList {
                fieldGroupName
                list {
                  title
                  text
                  fieldGroupName
                  cta {
                    url
                    title
                    target
                  }
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_ToolsResources {
                description
                fieldGroupName
                title
                list {
                  title
                  description
                  svg
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                fieldGroupName
                list {
                  answer
                  question
                  fieldGroupName
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CtaSection {
                fieldGroupName
                title
                button {
                  target
                  title
                  url
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
                description
                fieldGroupName
                items {
                  fieldGroupName
                  title
                  text
                }
                title
              }
            }
          }
        }
      }
    }
  }
`;
