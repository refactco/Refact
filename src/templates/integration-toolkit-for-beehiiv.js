import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"
import { GatsbyImage } from "gatsby-plugin-image"
import { Tooltip } from 'react-tooltip'
import Slider from "react-slick"


const BeehiivPage = ({data}) => {
  const beehiivContent = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = beehiivContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Hero');
  const textSection = beehiivContent.filter(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_TextSection'
    );
  const featureSlides = beehiivContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_FeatureSlides');
  const faqsSection = beehiivContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Faqs');
  const textButton = beehiivContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_TextButton');
  const testimonialsSection = beehiivContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Testimonials');
  const settings = {
    customPaging: function(i) {
      return (
        <span className="c-slide-dots">
          0{i + 1}
        </span>
      );
    },
    speed: 500,
    arrows: false,
    fade: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  const settingTestimonials = {
    speed: 500,
    infinite: true,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
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
        <ContainerBox className="c-section--landing-hero">
          <div className="row c-landing-hero">
            <div className="col-lg-7 c-landing-hero__col">
              <div className="c-landing-hero__wrap">
                {heroSection.svgLogo && (
                  <div className="c-landing-hero__logo" dangerouslySetInnerHTML={{__html:heroSection.svgLogo}}></div>
                )}
                {heroSection.title && (
                  <h1 className="c-landing-hero__title">{heroSection.title}</h1>
                )}
                {heroSection.text && (
                  <div className="c-landing-hero__text" dangerouslySetInnerHTML={{__html:heroSection.text}}></div>
                )}
                <div className="c-landing-hero__cta">
                  {heroSection.cta && (
                    <>
                    {heroSection.cta.url === '#' ? 
                      <>
                        <button className="c-btn has-icon" disabled={true} data-tooltip-id="my-tooltip"
                        data-tooltip-content="Under review by WP.org team."
                        data-tooltip-place="top">
                          <div className="c-btn__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" fill="none" viewBox="0 0 32 32"><path fill="currentColor" d="M4.43 16c0 4.584 2.667 8.533 6.523 10.41L5.436 11.293A11.528 11.528 0 0 0 4.43 16ZM16 27.57a11.69 11.69 0 0 0 3.846-.657l-.082-.154-3.56-9.743-3.467 10.081c1.027.307 2.124.472 3.263.472Zm1.59-16.997 4.184 12.44 1.16-3.856c.492-1.6.871-2.748.871-3.742 0-1.436-.513-2.422-.944-3.18-.595-.964-1.139-1.774-1.139-2.719 0-1.067.8-2.05 1.95-2.05h.142A11.528 11.528 0 0 0 16 4.43a11.56 11.56 0 0 0-9.662 5.21l.74.02c1.208 0 3.075-.153 3.075-.153.636-.03.708.881.083.953 0 0-.627.083-1.334.114l4.227 12.533 2.534-7.59-1.807-4.943a20.648 20.648 0 0 1-1.21-.103c-.626-.04-.554-.995.071-.964 0 0 1.908.153 3.047.153 1.21 0 3.077-.153 3.077-.153.625-.03.707.881.081.953 0 0-.625.072-1.333.114v-.002ZM21.815 26a11.569 11.569 0 0 0 4.337-15.55 10.924 10.924 0 0 1-.8 5.334L21.814 26l.002-.001ZM16 29.333a13.333 13.333 0 1 1 0-26.666 13.333 13.333 0 0 1 0 26.666Z" opacity=".7"/></svg>
                          </div>
                          {heroSection.cta.title}
                        </button>
                        <Tooltip id="my-tooltip" style={{ backgroundColor: "#fff", color: "#002729" }} />
                      </>
                    :
                    <a href={heroSection.cta.url} target='_blank' rel="nofollow, noreferrer" className="c-btn has-icon">
                      <div className="c-btn__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" fill="none" viewBox="0 0 32 32"><path fill="currentColor" d="M4.43 16c0 4.584 2.667 8.533 6.523 10.41L5.436 11.293A11.528 11.528 0 0 0 4.43 16ZM16 27.57a11.69 11.69 0 0 0 3.846-.657l-.082-.154-3.56-9.743-3.467 10.081c1.027.307 2.124.472 3.263.472Zm1.59-16.997 4.184 12.44 1.16-3.856c.492-1.6.871-2.748.871-3.742 0-1.436-.513-2.422-.944-3.18-.595-.964-1.139-1.774-1.139-2.719 0-1.067.8-2.05 1.95-2.05h.142A11.528 11.528 0 0 0 16 4.43a11.56 11.56 0 0 0-9.662 5.21l.74.02c1.208 0 3.075-.153 3.075-.153.636-.03.708.881.083.953 0 0-.627.083-1.334.114l4.227 12.533 2.534-7.59-1.807-4.943a20.648 20.648 0 0 1-1.21-.103c-.626-.04-.554-.995.071-.964 0 0 1.908.153 3.047.153 1.21 0 3.077-.153 3.077-.153.625-.03.707.881.081.953 0 0-.625.072-1.333.114v-.002ZM21.815 26a11.569 11.569 0 0 0 4.337-15.55 10.924 10.924 0 0 1-.8 5.334L21.814 26l.002-.001ZM16 29.333a13.333 13.333 0 1 1 0-26.666 13.333 13.333 0 0 1 0 26.666Z" opacity="1"/></svg>
                      </div>
                      {heroSection.cta.title}
                    </a>
                    }
                    </>
                  )}
                  {heroSection.githubUrl && (
                    <a href={heroSection.githubUrl.url} target='_blank' rel="nofollow, noreferrer" className="c-btn c-btn--transparent has-icon">
                      <div className="c-btn__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="none" viewBox="0 0 40 40"><path fill="currentColor" d="M19.984 2.98C10.324 2.977 2.5 10.797 2.5 20.45c0 7.632 4.895 14.12 11.71 16.503.919.23.778-.422.778-.867v-3.027c-5.3.62-5.515-2.887-5.87-3.473-.72-1.227-2.419-1.54-1.911-2.125 1.207-.621 2.438.156 3.863 2.262 1.032 1.527 3.043 1.27 4.063 1.015.223-.918.699-1.738 1.355-2.375-5.492-.984-7.781-4.336-7.781-8.32 0-1.934.637-3.711 1.887-5.145-.797-2.363.074-4.386.191-4.687 2.27-.203 4.63 1.625 4.813 1.77 1.289-.348 2.761-.532 4.41-.532 1.656 0 3.133.192 4.433.543.442-.336 2.63-1.906 4.739-1.715.113.301.965 2.278.215 4.61 1.265 1.437 1.91 3.23 1.91 5.168 0 3.992-2.305 7.347-7.813 8.316a4.981 4.981 0 0 1 1.488 3.555v4.394c.032.352 0 .7.586.7 6.918-2.333 11.899-8.868 11.899-16.567 0-9.656-7.828-17.473-17.48-17.473Z"/></svg>
                      </div>
                      {heroSection.githubUrl.title}
                      <div className="c-btn__icon is-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" fill="none" viewBox="0 0 11 12"><path fill="#59CC51" d="M10.53 6.53a.75.75 0 0 0 0-1.06L5.757.697a.75.75 0 1 0-1.06 1.06L8.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06L10.53 6.53ZM0 6.75h10v-1.5H0v1.5Z"/></svg>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-5 c-landing-hero__col">
              {heroSection.image && (
                <div className="c-landing-hero__image">
                  <GatsbyImage image={heroSection.image.localFile.childImageSharp.gatsbyImageData} alt={heroSection.image.altText} />
                </div>
              )}
            </div>
          </div>
      </ContainerBox>
      )}
      {textSection.map((section, index) => (
        <React.Fragment key={index}>
          <ContainerBox className={`o-section c-section--textbox is-textbox-${index}`}>
            <div className="c-textbox">
              <div className="c-textbox__wrap">
                {section.subHeading && (
                  <h3 className="c-textbox__sub-title">/ {section.subHeading}</h3>
                )}
                {section.title && (
                  <h2 className="c-textbox__title">{section.title}</h2>
                )}
                {section.description && (
                  <div className="c-textbox__description s-content" dangerouslySetInnerHTML={{ __html: section.description }}></div>
                )}
                {section.images && (
                  <div className="c-section__image">
                    <div className="c-section__image-wrap">
                      {section.images.map((image, index) => (
                        <GatsbyImage key={index} image={image.localFile.childrenImageSharp[0].gatsbyImageData} alt={image.altText} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
        </ContainerBox>
        {index === 0 && featureSlides && (
          <ContainerBox className="c-section--feature-slides">
            <Slider {...settings} className="c-feature-slides">
              {featureSlides.list.map((slide, index) => (
                <div className="c-feature-slide-slick" key={index}>
                <div className="c-feature-slides__items">
                  <div className="c-feature-slides__wrap">
                    <div className="c-textbox__sub-title c-feature-slides__sub-title">/ {slide.subHeading}</div>
                    <h4 className="c-feature-slides__title">{slide.title}</h4>
                    <div className="c-feature-slides__description s-content" dangerouslySetInnerHTML={{ __html: slide.description }}></div>
                  </div>
                  <div className="c-feature-slides__image">
                    <GatsbyImage image={slide.image.localFile.childrenImageSharp[0].gatsbyImageData} alt={slide.image.altText} />
                  </div>
                </div>
                </div>
              ))}
            </Slider>
          </ContainerBox>
        )}
        </React.Fragment>
      ))}
      {testimonialsSection && (
            <ContainerBox className='c-section--testimonials'>
              <div className="c-testimonials">
                {testimonialsSection.testimonialsList && (
                  <Slider {...settingTestimonials} className="c-testimonials__items">
                    {testimonialsSection.testimonialsList.map((item, index) => (
                      <div className="c-testimonials__item" key={index}>
                        <div className="c-testimonials__text">
                          <div>
                            <span>“</span>
                            {item.text}
                            <span>”</span>
                          </div>
                        </div>
                        <div className="c-testimonials__customers">
                          {item.name && (
                            <div className="c-customers__name">
                              <span>{item.name}</span> {item.position && ( 
                                <>
                                / {item.position}
                                </>
                               )}
                            </div>
                          )}
                          {item.logo && (
                            <div className="c-customers__logo" dangerouslySetInnerHTML={{__html:item.logo}}></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </ContainerBox>
          )}
      {textButton && (
        <ContainerBox className="c-section--btnbox">
          <div className="c-btnbox">
            {textButton.title && (
              <h2 className="c-btnbox__title">{textButton.title}</h2>
            )}
            {textButton.cta && (
              <a href={textButton.cta.url} target='_blank' rel="nofollow, noreferrer" className="c-btn">
                {textButton.cta.title}
              </a>
            )}
          </div>
        </ContainerBox>
      )}
      {faqsSection && (
        <ContainerBox className="c-section--faqs is-beehiiv">
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
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></div>
            </div>
          ))}
          </div>
          <div className="c-cta c-cta--beehiiv">
            <Link to="/contact" className='c-btn c-btn--green'>Have More Questions?</Link>
          </div>
        </ContainerBox>
      )}
    </Layout>
  )
}

export default BeehiivPage

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
    wpPage(slug: {eq: "integration-toolkit-for-beehiiv"}) {
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
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Hero {
                fieldGroupName
                svgLogo
                title
                text
                image {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                githubUrl {
                  target
                  title
                  url
                }
                cta {
                  target
                  title
                  url
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                description
                fieldGroupName
                images {
                  altText
                  localFile {
                    childrenImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                moreFeatures
                subHeading
                title
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeatureSlides {
                fieldGroupName
                list {
                  description
                  fieldGroupName
                  image {
                    altText
                    localFile {
                      childrenImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  subHeading
                  title
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                fieldGroupName
                list {
                  answer
                  fieldGroupName
                  question
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextButton {
                fieldGroupName
                title
                cta {
                  target
                  title
                  url
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonials {
                fieldGroupName
                title
                testimonialsList {
                  fieldGroupName
                  logo
                  name
                  text
                  position
                }
              }
            }
          }
        }
      }
    }
  }
`