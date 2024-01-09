import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import { Link, graphql } from 'gatsby';
import React, { useState } from 'react';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';

const ContactPage = ({ data }) => {
  const [fieldValues, setFieldValues] = useState({});
  const { wpPage, wpGfForm } = data;
  const contactContent = wpPage.template.pageBuilder.pageBuilder;

  const { submitButton, formFields } = wpGfForm;

  const heroSection = contactContent.find(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader'
  );

  const client = new ApolloClient({
    uri: process.env.WPGRAPHQL_URL,
    cache: new InMemoryCache(),
  });

  const convertInputType = (type) => {
    if (type === 'WEBSITE') {
      return 'url';
    }

    return type.toLowerCase();
  };

  const [submitForm, { data: mutationData, loading }] = useMutation(
    gql`
      mutation WelcomeOnBoardingMutation(
        $fieldValues: [FormFieldValuesInput]!
      ) {
        submitGfForm(
          input: {
            id: 9
            fieldValues: $fieldValues
            saveAsDraft: false
            sourcePage: 1
            targetPage: 0
          }
        ) {
          confirmation {
            type
            message
            url
          }
          errors {
            id
            message
          }
        }
      }
    `,
    { client }
  );

  console.log({ mutationData, loading });

  return (
    <Layout>
      {heroSection && (
        <ContainerBox className="o-section c-section--page-header">
          <div className="c-page-header is-full">
            {heroSection.subtitle && (
              <div className="c-page-header__sub-title">
                {heroSection.subtitle}
              </div>
            )}
            <h1 className="c-page-header__title" style={{ maxWidth: 934 }}>
              {heroSection.title}
            </h1>
            <div
              className="c-page-header__text"
              dangerouslySetInnerHTML={{ __html: heroSection.text }}
            ></div>
            {heroSection.cta && (
              <div className="c-page-header__cta">
                {heroSection.cta.target === '_blank' ? (
                  <a
                    href={heroSection.cta.url}
                    target="_blank"
                    rel="nofollow, noreferrer"
                    className="c-btn"
                  >
                    {heroSection.cta.title}
                  </a>
                ) : (
                  <Link to={heroSection.cta.url} className="c-btn">
                    {heroSection.cta.title}
                  </Link>
                )}
              </div>
            )}
          </div>
        </ContainerBox>
      )}
      <ContainerBox className="c-section--contact">
        <div className="c-contact">
          <p>Please add contact form here.</p>
          <form
            onSubmit={(event) => {
              event.stopPropagation();
              event.preventDefault();

              const values = Object.entries(fieldValues).map(([key, value]) => {
                let emailObject = {};

                if (key === '4') {
                  emailObject = {
                    emailValues: {
                      confirmationValue: '',
                      value,
                    },
                  };
                }

                return {
                  id: Number(key),
                  value,
                  ...emailObject,
                };
              });

              submitForm({
                variables: {
                  fieldValues: values,
                },
              });
            }}
          >
            {formFields.nodes.map((field, index) => {
              const {
                type,
                // layoutGridColumnSpan,
                inputName,
                isRequired,
                label,
                placeholder,
                databaseId,
              } = field;

              return (
                <div key={index}>
                  <label>
                    {label} {isRequired ? <span>*</span> : ''}
                    {type === 'TEXTAREA' ? (
                      <textarea
                        placeholder={placeholder}
                        name={inputName}
                        value={fieldValues[databaseId]}
                        onChange={(event) => {
                          setFieldValues({
                            ...fieldValues,
                            [databaseId]: event.target.value,
                          });
                        }}
                      >
                        {fieldValues[databaseId]}
                      </textarea>
                    ) : (
                      <input
                        placeholder={placeholder}
                        name={inputName}
                        type={convertInputType(type)}
                        value={fieldValues[databaseId]}
                        onChange={(event) => {
                          console.log({ event, databaseId });
                          setFieldValues({
                            ...fieldValues,
                            [databaseId]: event.target.value,
                          });
                        }}
                      />
                    )}
                  </label>
                </div>
              );
            })}
            <div>
              <button type="submit" disabled={loading}>
                {submitButton.text}
              </button>
            </div>
            {mutationData?.submitGfForm?.confirmation ? (
              <div style={{ color: 'green' }}>successfully added</div>
            ) : null}
          </form>
        </div>
      </ContainerBox>
    </Layout>
  );
};

export default ContactPage;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title="Contact | Refact" description={post.content} />
    </>
  );
}

export const pageQuery = graphql`
  query {
    wpPage(slug: { eq: "contact" }) {
      id
      content
      template {
        ... on WpTemplate_PageBuilder {
          templateName
          pageBuilder {
            fieldGroupName
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                fieldGroupName
                subtitle
                text
                title
              }
            }
          }
        }
      }
    }
    wpGfForm(databaseId: { eq: 9 }) {
      submitButton {
        text
        type
        location
      }
      formFields {
        nodes {
          type
          layoutGridColumnSpan
          pageNumber
          databaseId
          ... on WpTextField {
            inputName
            isRequired
            label
            placeholder
          }
          ... on WpEmailField {
            inputName
            isRequired
            label
            placeholder
          }
          ... on WpWebsiteField {
            inputName
            isRequired
            label
            placeholder
          }
          ... on WpTextAreaField {
            inputName
            isRequired
            label
            placeholder
          }
        }
      }
    }
  }
`;
