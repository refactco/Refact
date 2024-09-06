import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import PatternBg from '../components/patterns/pattern-bg';
import Button, {BgMode, BtnType}  from '../components/button/button';

const handleSmoothScroll = (event) => {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href').substring(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth',
    });
  }
};

const renderSection = (section, index) => {
  switch (section.fieldGroupName) {
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader':
      return (
        <ContainerBox key={index} className="c-section-partners">
          <div className="c-page-header is-full">
            <h1 className="c-page-header__title" style={{ maxWidth: 724 }}>
              {section.title}
            </h1>
            <div
              className="c-page-header__text"
              dangerouslySetInnerHTML={{ __html: section.text }}
              style={{ maxWidth: 800 }}
            ></div>
            {section.cta && (
              <div className="c-page-header__cta">
                {section.cta.target === '_blank' ? (
                  <a
                    href={section.cta.url}
                    target="_blank"
                    rel="nofollow, noreferrer"
                    className="c-btn"
                  >
                    {section.cta.title}
                  </a>
                ) : (
                  <a href={section.cta.url} className="c-btn c-btn--primary is-btn-dark" onClick={handleSmoothScroll}>
                    <span>{section.cta.title}</span>
                    <div className="c-btn__icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                          <path d="M6 18 18 6M8.25 6H18v9.75"/>
                        </g>
                      </svg>
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>
          <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
          <PatternBg pattern="pagePattern" className='is-page-pattern' />
        </ContainerBox>
      )
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites':
      return (
        <ContainerBox key={index} className="c-section--capabilites" id="become-partner">
          <div className="c-capabilites">
            <div className='c-section'>
              {section.title && (
                <div className="c-section__title">{section.title}</div>
              )}
              {section.description && (
                <h2 className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}} />
              )}
            </div>
            {section.items && (
              <div className="c-sf__list">
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
        </ContainerBox>
      )
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_ToolsResources':
      return (
        <ContainerBox key={index} className="c-section--partners">
          <div className="c-partners">
            <div className='c-section'>
              {section.title && (
                <h2 className="c-section__title" dangerouslySetInnerHTML={{__html:section.title}} />
              )}
            </div>
            {section.list && (
                <div className="c-partners__list">
                  {section.list.map((item, index) => (
                    <div className="c-partners-list__items"  key={index}>
                      <a href={item.cta.url} target="_blank" rel="noopener noreferrer" title={item.cta.title}>
                        <div className='c-partners__logo'>
                          {item.svg ? (
                            <div className='c-partners-logo__svg' dangerouslySetInnerHTML={{ __html: item.svg }} />
                          ) : (
                            item.image && (
                              <div className='c-partners-logo__img' style={item.customWidth ? { width: item.customWidth } : {}}>
                                <GatsbyImage
                                  image={item.image.localFile.childImageSharp.gatsbyImageData}
                                  alt={item.title}
                                />
                              </div>
                            )
                          )}
                        </div>
                        <div className='c-partners__details'>
                          <h4 className='c-partners__title'>{item.title}</h4>
                          <div className='c-partners__text' dangerouslySetInnerHTML={{__html: item.description}} />
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              )}
          </div>
          <PatternBg pattern="lightTop" className='is-our-partners' />
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
    default:
      return null
  }
}

const PartnersPage = ({ data }) => {
  const partnersContent = data.wpPage.template.pageBuilder.pageBuilder;
  return (
    <Layout>
      {partnersContent && (
        partnersContent.map((section, index) => (
          renderSection(section, index)
        ))
      )}
    </Layout>
  );
};

export default PartnersPage;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} featuredImage={post.seo.opengraphImage.localFile.url} />
      <body className="is-partners-page" />
    </>
  );
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "partners"}) {
      id
      content
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
                cta {
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
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                desktop
                fieldGroupName
                mobile
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_ToolsResources {
                fieldGroupName
                title
                list {
                  cta {
                    target
                    title
                    url
                  }
                  customWidth
                  description
                  fieldGroupName
                  image {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  svg
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;
