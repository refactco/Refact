import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout/layout";
import ContainerBox from '../components/container-box/container-box';
import Seo from '../components/seo/seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import ClientsLogo from '../components/clients-logo/clients-logo';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import PatternBg from '../components/patterns/pattern-bg';
import Button, {BgMode, BtnType} from '../components/button/button';
import ClutchWidget from '../components/clutch-widget/clutch-widget';



const AboutPage = ({ data }) => {
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

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style}}
        onClick={onClick}
        role="button" // Adds button role for accessibility
        tabIndex={0}  // Makes the div focusable via keyboard
        aria-label="Prev slide"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick(e); // Triggers click on Enter or Space key press
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" fill="#F2F3F3" rx="20"/><path fill="#798686" d="M27.78 19a1 1 0 1 1 0 2v-2Zm-16.267 1.707a1 1 0 0 1 0-1.414l6.364-6.364a1 1 0 0 1 1.414 1.414L13.634 20l5.657 5.657a1 1 0 0 1-1.414 1.414l-6.364-6.364ZM27.78 21H12.22v-2h15.56v2Z"/></svg>
      </div>
    );
  }
  
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style }}
        onClick={onClick}
        aria-label="Next slide"
        role="button" // Adds button role for accessibility
        tabIndex={0}  // Makes the div focusable via keyboard
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick(e); // Triggers click on Enter or Space key press
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><rect width="40" height="40" fill="#E5F7E3" rx="20"/><path fill="#002729" d="M12.22 19a1 1 0 1 0 0 2v-2Zm16.267 1.707a1 1 0 0 0 0-1.414l-6.364-6.364a1 1 0 0 0-1.414 1.414L26.366 20l-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364ZM12.22 21h15.56v-2H12.22v2Z"/></svg>
      </div>
    );
  }
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 1.1, // Show 1 slide on mobile
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ]
  };
  const renderSection = (section, index) => {
    switch (section.fieldGroupName) {
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Team':
        return (
          <ContainerBox key={index} className="c-section--team">
            <div className="c-team">
              <div className='c-section'>
                {section.title && (
                  <div className="c-section__title">{section.title}</div>
                )}
                {section.description && (
                  <h2 className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}} />
                )}
              </div>
              {section.team && (
                <div className="c-team-list">
                  {section.team.map((item, index) => (
                    <div className="c-team-list__items"  key={index}>
                      <div className="c-team-list__photo">
                        <GatsbyImage image={item.photo.localFile.childImageSharp.gatsbyImageData} alt={item.name} />
                      </div>
                      <div className='c-team-list__info'>
                        <div className="c-team-info__name">{item.name}</div>
                        <div className="c-team-info__position">{item.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <PatternBg pattern="projectRightPattern" className='is-project-pattern-1' />
            <PatternBg pattern="projectLeftPattern" className='is-project-pattern-2' />
            <PatternBg pattern="projectRightPattern" className='is-project-pattern-3 ' />
            <PatternBg pattern="highlightLeft" className='is-project-pattern-4' />
            <PatternBg pattern="highlightRight" className='is-project-pattern-5' />
          </ContainerBox>
        )
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
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites':
        return (
          <ContainerBox key={index} className="c-section--sf">
            {section.items && (
              <div className="c-sf__list">
                <div className="c-sf-list__items">
                  {section.title && (
                    <div className="c-section__title">{section.title}</div>
                  )}
                  {section.description && (
                    <div className="c-section__desc" dangerouslySetInnerHTML={{__html: section.description}} />
                  )}
                  {section.cta && (
                  <div className='c-section__cta'>
                    <Button 
                      target={section.cta.target} 
                      url={section.cta.url} 
                      text={section.cta.title} 
                      type={BtnType.SECONDARY} 
                      bgMode={BgMode.DARK}
                    />
                  </div>
                  )}
                </div>
                {section.items.map((item, index) => (
                  <div className="c-sf-list__items" key={index}>
                    <div className="c-sf__num">0{index+1}</div>
                    <div className="c-sf__title">{item.title}</div>
                    <div className="c-sf__text" dangerouslySetInnerHTML={{__html: item.text}} />
                  </div>
                ))}
              </div>
            )}
            <PatternBg pattern="highlightLeft" className='is-project-pattern-4 is-our-value' />
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_LogoSection':
        return (
          <ContainerBox key={index} className='c-section--clutch'>
            <ClutchWidget />
          </ContainerBox>
        )
        case 'Template_PageBuilder_Pagebuilder_PageBuilder_Clients':
          return (
            <ContainerBox key={index} className="c-section--client is-about-page">
              <div className="c-client">
                <div className='c-section'>
                  {section.title && (
                    <div className="c-section__title">{section.title}</div>
                  )}
                  {section.description && (
                    <h2 className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}} />
                  )}
                </div>
                {section.showClientLogos && (
                  <ClientsLogo />
                )}
                <div className='c-sf__cta'>
                  <Button 
                    url="/work"
                    text="read more success stories"
                    type={BtnType.SECONDARY} 
                    bgMode={BgMode.LIGHT} 
                  />
                </div>
              </div>
              <PatternBg pattern="lightLeft" className='is-pattern-client' />
            </ContainerBox>
          )
          case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextSection':
            return (
              <ContainerBox key={index} className={`c-section--workstyle`}>
                <div className='c-workstyle'>
                  <div className='c-workstyle__content'>
                    {section.title && (
                      <h2 className="c-section__title">{section.title}</h2>
                    )}
                    {section.description && (
                      <div className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}} />
                    )}
                  </div>
                  {section.images && (
                    <div className="c-workstyle__images">
                      {section.images.map((image, index) => (
                        <div className="c-workstyle__image" key={index}>
                          <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <PatternBg pattern="lightLeft" className='is-workstyle-pattern' />
              </ContainerBox>
            )
          case 'Template_PageBuilder_Pagebuilder_PageBuilder_Testimonials':
            return (
              <ContainerBox key={index} className={`c-section--team-testimonial`}>
                <div className='c-team-testimonial'>
                  <div className='c-section'>
                    {section.title && (
                      <div className="c-section__title" dangerouslySetInnerHTML={{__html:section.title}} />
                    )}
                  </div>
                  {section.testimonialsList && (
                    <Slider {...settings} className="c-team-testimonial__list">
                      {section.testimonialsList.map((item, index) => (
                        <div className="c-team-testimonial__items"  key={index}>
                          <div className='c-team-testimonial__content' dangerouslySetInnerHTML={{__html: item.text}} />
                          <div className='c-team-testimonial__info'>
                            <div className="c-team-testimonial__photo">
                              <GatsbyImage image={item.coverPhoto.localFile.childImageSharp.gatsbyImageData} alt={item.name} />
                            </div>
                            <div className='c-team-testimonial__author'>
                              <div className="c-team-testimonial-author__text is-name">{item.name}</div>
                              <div className="c-team-testimonial-author__text is-position">{item.position}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  )}
                  {section.cta && (
                    <div className='c-sf__cta'>
                      <Button 
                        target={section.cta.target} 
                        url={section.cta.url} 
                        text={section.cta.title} 
                        type={BtnType.SECONDARY} 
                        bgMode={BgMode.LIGHT} 
                      />
                    </div>
                  )}
                </div>
                <PatternBg pattern="lightLeft" className='is-pattern-testimonial' />
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
                        >
                          {faq.answer}
                        </div>
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
      default:
        return null
    }
  }
  const aboutContent = data.wpPage.template.pageBuilder.pageBuilder;
  const heroAndNumbers = pageBuilder.filter(
    section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader' || 
               section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_RefactInNumbers'
  );
  return (
    <Layout>
      <ContainerBox className="c-section--about">
        {heroAndNumbers.map((section, index) => (
          <React.Fragment key={index}>
            {section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader' && (
              <div className="c-page-header">
                {section.title && (
                  <h1 className="c-page-header__title">
                    {section.title}
                  </h1>
                )}
              </div>
            )}
            {section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_RefactInNumbers' && (
              <div className='c-refact-number'>
                {section.list && (
                  <div className="c-refact-number__list">
                    {section.list.map((item, index) => (
                      <div className="c-refact-number__items"  key={index}>
                        <div className="c-refact-number__num">{item.title}</div>
                        <div className="c-refact-number__title" dangerouslySetInnerHTML={{__html:item.text}} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
        <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
        <PatternBg pattern="heroPattern" className='is-hero-pattern' />
      </ContainerBox>
      {aboutContent.filter(section => section.fieldGroupName !== 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader' && 
        section.fieldGroupName !== 'Template_PageBuilder_Pagebuilder_PageBuilder_RefactInNumbers').map((section, index) => (
          renderSection(section, index)
      ))}
    </Layout>
  );
};

export default AboutPage;

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
    wpPage(slug: {eq: "about"}) {
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
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
                description
                fieldGroupName
                items {
                  fieldGroupName
                  text
                  title
                }
                title
                cta {
                  target
                  title
                  url
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Team {
                description
                fieldGroupName
                title
                team {
                  fieldGroupName
                  name
                  photo {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  position
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Clients {
                description
                fieldGroupName
                showClientLogos
                title
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_RefactInNumbers {
                fieldGroupName
                headline
                list {
                  fieldGroupName
                  text
                  title
                }
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
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonials {
                fieldGroupName
                title
                cta {
                  target
                  title
                  url
                }
                testimonialsList {
                  coverPhoto {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  fieldGroupName
                  name
                  position
                  text
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                fieldGroupName
                list {
                  question
                  fieldGroupName
                  answer
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                desktop
                fieldGroupName
                mobile
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_LogoSection {
                fieldGroupName
              }
            }
          }
        }
      }
    }
  }
`;
