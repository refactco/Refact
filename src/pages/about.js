import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Layout from "../components/layout/layout";
import ContainerBox from '../components/container-box/container-box';
import Seo from '../components/seo/seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import ClientsLogo from '../components/clients-logo/clients-logo';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";


const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query AboutPageQuery {
      aboutPage:  wpPage(slug: {eq: "about"}) {
        id
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
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial {
                  fieldGroupName
                  name
                  position
                  text
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
              }
            }
          }
        }
      }
    }
  `);

const pageBuilder = data.aboutPage.template.pageBuilder.pageBuilder;
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
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader':
        return (
          <ContainerBox key={index} className="c-section--page-header is-about-hero">
            <div className="c-page-header">
                {section.subtitle && (
                  <div className="c-page-header__sub-title">
                    {section.subtitle}
                  </div>
                )}
                {section.title && (
                  <h1 className="c-page-header__title">
                    {section.title}
                  </h1>
                )}
              </div>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Team':
        return (
          <ContainerBox key={index} className="c-section--team">
            <div className="c-team">
              <div className='c-section'>
                {section.title && (
                  <div className="c-page-header__sub-title c-sf__headline">{section.title}</div>
                )}
                {section.description && (
                  <h2 className="c-section__title" dangerouslySetInnerHTML={{__html:section.description}} />
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
          <ContainerBox key={index} className="c-section--capabilites">
            <div className="c-capabilites">
              <div className='c-section'>
                {section.title && (
                  <div className="c-page-header__sub-title c-sf__headline">{section.title}</div>
                )}
                {section.description && (
                  <h2 className="c-section__title" dangerouslySetInnerHTML={{__html:section.description}} />
                )}
              </div>
              {section.items && (
                <div className="c-capabilites__list">
                  {section.items.map((item, index) => (
                    <div className="c-capabilites-list__items"  key={index}>
                      <div className="c-sf__num">0{index+1}</div>
                      <div className="c-sf__title">{item.title}</div>
                      <div className="c-sf__text" dangerouslySetInnerHTML={{__html: item.text}} />
                    </div>
                  ))}
                </div>
              )}
              {section.cta && (
                <div className='c-sf__cta'>
                  {section.cta.target === '_blank' ? (
                    <a 
                      href={section.cta.url} 
                      className="c-services-items__link c-btn--secondary"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {section.cta.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle cx="12" cy="12" r="12" fill="#31A329" />
                        <path
                          d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  ) : (
                    <Link to={section.cta.url} className="c-services-items__link c-btn--secondary">
                      {section.cta.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle cx="12" cy="12" r="12" fill="#31A329" />
                        <path
                          d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial':
        return (
          <ContainerBox key={index} className={`c-section--featured-testimonial is-testimonial-${index}`}>
            <div className="c-work__testimonial">
              <div className="c-work-testimonial__text">
                <div className="c-work-testimonial__quote">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" fill="none" viewBox="0 0 64 48"><path fill="#D9EED6" d="m20 8 4-8h-8C7.16 0 0 11.16 0 20v28h28V20H12c0-12 8-12 8-12Zm28 12c0-12 8-12 8-12l4-8h-8c-8.84 0-16 11.16-16 20v28h28V20H48Z" /></svg>
                </div>
                <span dangerouslySetInnerHTML={{__html: section.text}} />
              </div>
              <div className="c-work-testimonial__info">
                {section.name && (
                  <div className="c-work-testimonial__name">{section.name}</div>
                )}
                {section.position && (
                  <div className="c-work-testimonial__position">{section.position}</div>
                )}
              </div>
            </div>
          </ContainerBox>
        )
        case 'Template_PageBuilder_Pagebuilder_PageBuilder_Clients':
          return (
            <ContainerBox key={index} className="c-section--client is-about-page">
              <div className="c-client">
                <div className='c-section'>
                  {section.title && (
                    <div className="c-page-header__sub-title c-sf__headline">{section.title}</div>
                  )}
                  {section.description && (
                    <h2 className="c-section__title" dangerouslySetInnerHTML={{__html:section.description}} />
                  )}
                </div>
                {section.showClientLogos && (
                  <ClientsLogo />
                )}
                <div className='c-sf__cta'>
                  <Link to="/work" className="c-services-items__link c-btn--secondary">
                      read more success stories
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle cx="12" cy="12" r="12" fill="#31A329" />
                        <path
                          d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                </div>
              </div>
            </ContainerBox>
          )
        case 'Template_PageBuilder_Pagebuilder_PageBuilder_RefactInNumbers':
          return (
            <ContainerBox key={index} className={`c-section--refact-number`}>
              <div className='c-refact-number'>
                {section.headline && (
                  <div className="c-page-header__sub-title c-sf__headline">{section.headline}</div>
                )}
                {section.list && (
                  <div className="c-refact-number__list">
                    {section.list.map((item, index) => (
                      <div className="c-refact-number__items"  key={index}>
                        <div className="c-refact-number__num">{item.title}</div>
                        <div className="c-refact-number__title">{item.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ContainerBox>
          )
          case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextSection':
            return (
              <ContainerBox key={index} className={`c-section--workstyle`}>
                <div className='c-workstyle'>
                  <div className='c-workstyle__content'>
                    {section.subHeading && (
                      <div className="c-page-header__sub-title c-sf__headline">{section.subHeading}</div>
                    )}
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
                      {section.cta.target === '_blank' ? (
                        <a 
                          href={section.cta.url} 
                          className="c-services-items__link c-btn--secondary"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {section.cta.title}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle cx="12" cy="12" r="12" fill="#31A329" />
                            <path
                              d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                      ) : (
                        <Link to={section.cta.url} className="c-services-items__link c-btn--secondary">
                          {section.cta.title}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle cx="12" cy="12" r="12" fill="#31A329" />
                            <path
                              d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                              fill="white"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </ContainerBox>
            )
          case 'Template_PageBuilder_Pagebuilder_PageBuilder_Faqs':
            return (
              <ContainerBox key={index} className={`c-section--faq`}>
                <div className="c-faq">
                  <div className='c-faq__col'>
                    <div className='c-section'>
                      <h2 className="c-section__title">FAQs</h2>
                      <div className='c-sf__cta'>
                        <Link to="/toolkit" className="c-services-items__link c-btn--secondary">
                            Learn More About Our Tech
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle cx="12" cy="12" r="12" fill="#31A329" />
                              <path
                                d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                                fill="white"
                              />
                            </svg>
                          </Link>
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
                      <Link to="/toolkit" className="c-services-items__link c-btn--secondary">
                          Learn More About Our Tech
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle cx="12" cy="12" r="12" fill="#31A329" />
                            <path
                              d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                              fill="white"
                            />
                          </svg>
                        </Link>
                    </div>
                  </div>
                </div>
              </ContainerBox>
            )
      default:
        return null
    }
  }
  return (
    <Layout>
      {pageBuilder && (
        pageBuilder.map((section, index) => (
          renderSection(section, index)
        ))
      )}
    </Layout>
  )
}

export default AboutPage


export function Head() {
  return (
    <>
      <Seo title="About | Refact" description="Refact: Empowering news and media with innovative design, development, and digital publishing solutions for sustainable success." />
    </>
  )
}