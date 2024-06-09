import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from "../components/layout/layout";
import ContainerBox from '../components/container-box/container-box';
import AboutLogo from '../components/about-logo/about-logo';
import Seo from '../components/seo/seo';

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query AboutPageQuery {
      aboutPage: wpPage(slug: {eq: "about"}) {
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
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Team {
                  description
                  fieldGroupName
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_WeWork {
                  description
                  fieldGroupName
                  items {
                    fieldGroupName
                    text
                    title
                  }
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Clients {
                  description
                  fieldGroupName
                  showClientLogos
                  title
                }
              }
            }
          }
        }
      }
    }
  `);
const aboutItems = data.aboutPage.template.pageBuilder.pageBuilder;
// console.log(aboutItems);
 const pageHeader = aboutItems.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader');
  const capabilities = aboutItems.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites');
  const team = aboutItems.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Team');
  const weWork = aboutItems.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_WeWork');
  const clients = aboutItems.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Clients');
  return (
    <Layout>
      {pageHeader && (
        <ContainerBox className="c-section--page-header">
          <div className="c-page-header">
              {pageHeader.subtitle && (
                <div className="c-page-header__sub-title">
                  {pageHeader.subtitle}
                </div>
              )}
              {pageHeader.title && (
                <h1 className="c-page-header__title">
                  {pageHeader.title}
                </h1>
              )}
              {pageHeader.text && (
                <div className="c-page-header__text" dangerouslySetInnerHTML={{__html:pageHeader.text}}></div>
              )}
            </div>
        </ContainerBox>
      )}
      {capabilities && (
        <ContainerBox className="c-section--capabilites pb-small is-about">
          <div className="c-capabilites">
            {capabilities.title && (
              <h3 className="c-section__title">{capabilities.title}</h3>
            )}
          </div>
        </ContainerBox>
      )}
      {team && (
        <ContainerBox className="c-section--team">
          <div className="c-team">
            {team.title && (
              <h3 className="c-section__title">{team.title}</h3>
            )}
            {team.description && (
              <div className="c-team__description mb-0" dangerouslySetInnerHTML={{__html:team.description}}></div>
            )}
            </div>
        </ContainerBox>
      )}
      {weWork && (
        <ContainerBox className="c-section--capabilites">
          <div className="c-capabilites">
            {weWork.title && (
              <h3 className="c-section__title">{weWork.title}</h3>
            )}
            {weWork.description && (
              <div className="c-capabilites__description c-capabilites__description--max">
                {weWork.description}
              </div>
            )}
            {weWork.items && (
              <div className="c-capabilites__items c-capabilites__items--we-work">
                {weWork.items.map((item, index) => (
                  <div className="c-capabilites__item" key={index}>
                    {item.title && (
                      <div className="c-capabilites__title c-capabilites__title--secondary">{item.title}</div>
                    )}
                    {item.text && (
                      <div className="c-capabilites__text">{item.text}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ContainerBox>
      )}
      {clients && (
        <ContainerBox className="c-section--client">
          <div className="c-client">
            {clients.title && (
              <h3 className="c-section__title">{clients.title}</h3>
            )}
            {clients.description && (
              <div className="c-client__text" dangerouslySetInnerHTML={{__html:clients.description}}></div>
            )}
            {clients.showClientLogos && (
              <AboutLogo />
            )}
          </div>
        </ContainerBox>
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