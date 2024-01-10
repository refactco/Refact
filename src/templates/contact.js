import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import { Link, graphql } from 'gatsby';
import React, { useState } from 'react';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import { PopupModal } from 'react-calendly';

const ContactPage = ({ data }) => {
  const [fieldValues, setFieldValues] = useState({});
  const { wpPage, wpGfForm } = data;
  const contactContent = wpPage.template.pageBuilder.pageBuilder;
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(true);    
  };

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
        <ContainerBox className="o-section c-section--page-header is-page-contact">
          <div className="c-page-header is-full">
            {heroSection.subtitle && (
              <div className="c-page-header__sub-title">
                {heroSection.subtitle}
              </div>
            )}
            <h1 className="c-page-header__title" style={{ maxWidth: 745 }}>
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
          <div className='c-contact__text'>
          Reach out via the form below or schedule a  
            {typeof window !== 'undefined' && (
              <>
                <button
                  onClick={handleLinkClick}>
                    call with us here
                  </button>
                <PopupModal
                  url="https://calendly.com/saeedreza/30min"
                  rootElement={document.body}
                  onModalClose={() => setIsOpen(false)}
                  open={isOpen}
                /></>)}.
          </div>
          <h2 className={`c-contact-form__title ${mutationData?.submitGfForm?.confirmation ? 'is-hidden' : ''}`}>Let's chat.</h2>
          <div className='gform_wrapper gravity-theme'>
            <form
              className={`c-form ${mutationData?.submitGfForm?.confirmation ? 'is-hidden' : ''}`}
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
            <div className='gform-body gform_body'>
              <div className='gform_fields top_label form_sublabel_below description_below'>
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
                    <div className={`gfield gfield--type-${type.toLowerCase()} gfield--width-full`} key={index}>
                      <label className='gfield_label gform-field-label' htmlFor={`input_${databaseId}`}>
                        {label} {isRequired ? <span>*</span> : ''}
                      </label>
                      <div className={`ginput_container ginput_container_${type.toLowerCase()}`}>
                        {type === 'TEXTAREA' ? (
                          <textarea
                            placeholder={placeholder}
                            name={inputName}
                            value={fieldValues[databaseId]}
                            id={`input_${databaseId}`}
                            className='c-textarea'
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
                            id={`input_${databaseId}`}
                            onChange={(event) => {
                              console.log({ event, databaseId });
                              setFieldValues({
                                ...fieldValues,
                                [databaseId]: event.target.value,
                              });
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='gform_footer top_label'>
              <button type="submit" disabled={loading} className='gform_button button'>
                {submitButton.text}
              </button>
            </div>
            </form>
            {mutationData?.submitGfForm?.confirmation ? (
              <div className="gform_confirmation_message">
                <svg xmlns="http://www.w3.org/2000/svg" width="112" viewBox="0 0 112 112" fill="none"><g fill="#59CC51" clip-path="url(#a)"><path d="M108.798 15.311a4.22 4.22 0 0 0-5.968-.007L52.19 65.81 33.92 45.966a4.221 4.221 0 0 0-6.21 5.718l21.246 23.074a4.216 4.216 0 0 0 3.105 1.362c1.116 0 2.19-.443 2.98-1.23L108.79 21.28a4.22 4.22 0 0 0 .008-5.97Z"></path><path d="M107.779 51.779A4.22 4.22 0 0 0 103.558 56c0 26.224-21.334 47.558-47.558 47.558-26.223 0-47.558-21.334-47.558-47.558C8.442 29.777 29.777 8.442 56 8.442A4.22 4.22 0 1 0 56 0C25.121 0 0 25.121 0 56c0 30.877 25.121 56 56 56 30.877 0 56-25.123 56-56a4.221 4.221 0 0 0-4.221-4.221Z"></path></g></svg>
                <h3>Thanks for contacting us! We will get in touch with you shortly.</h3>
              </div>
            ) : null}
          </div>
          <div className='c-contact-footer__info s-content'>
            <h4 className='c-contact-info__title'>
              Not ready to chat?
            </h4>
            <p className='c-contact-info__text'>
              Why not take a moment to browse through our previous projects? Let our work inspire you! And for a regular dose of inspiration, make sure to follow us and keep up with all the exciting developments in digital media. We're constantly updating our feeds with fresh, innovative ideas, and we'd love to share our world of creativity with you.
            </p>
          </div>
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
