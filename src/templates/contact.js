import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import { graphql } from 'gatsby';
import React, { useState, useEffect } from 'react';
import { PopupModal } from 'react-calendly';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import PatternBg from '../components/patterns/pattern-bg';
import Button , { BgMode, BtnType } from '../components/button/button';
import SpinnerIcon from '../components/spinner/spinner';
import ClutchWidget from '../components/clutch-widget/clutch-widget';

// Add these functions to manage UTM cookies
function getUTMCookies() {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});

  return {
    utm_campaign: cookies.utm_campaign || '',
    utm_medium: cookies.utm_medium || '',
    utm_source: cookies.utm_source || '',
    utm_term: cookies.utm_term || '',
  };
}

const ContactPage = ({ data }) => {
  const { wpPage, wpGfForm } = data;
  
  const initialFieldValues = wpGfForm.formFields.nodes.reduce((acc, field) => {
    if (field.type === 'SELECT' && field.choices.length > 0) {
      acc[field.databaseId] = field.placeholder;
    } else {
      acc[field.databaseId] = field.defaultValue ?? '';
    }
    return acc;
  }, {});

  const [fieldValues, setFieldValues] = useState(initialFieldValues);
  // const [validationErrors, setValidationErrors] = useState({});

  const contactContent = wpPage.template.pageBuilder.pageBuilder;
  const [isOpen, setIsOpen] = useState(false);
  const formId = 9;

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

  useEffect(() => {
    const utmCookies = getUTMCookies();
    // console.log('utmCookies', utmCookies);
    setFieldValues(prevValues => ({
      ...prevValues,
      12: utmCookies.utm_campaign,
      13: utmCookies.utm_medium,
      14: utmCookies.utm_source,
      15: utmCookies.utm_term,
    }));
  }, []);

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

  // console.log({ mutationData, loading });

  return (
    <Layout>
      {heroSection ? (
        <ContainerBox className="c-section--work is-page-contact">
          <div className="c-page-header is-full">
            <h1 className="c-page-header__title">
              {heroSection.title}
            </h1>
            <div
              className="c-page-header__text" style={{ maxWidth: 800 }}
              dangerouslySetInnerHTML={{ __html: heroSection.text }} />
          </div>
          <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
          <PatternBg pattern="pagePattern" className='is-page-pattern' />
        </ContainerBox>
      ) : null}
      <ContainerBox className="c-section--contact is-contact">
        <div className="c-contact">
          <div className='c-contact__col'>
            <h3
              className={`c-contact-form__title ${
                mutationData?.submitGfForm?.confirmation ? 'is-hidden' : ''
              }`}
            >
              Let's chat.
            </h3>
            <div className="c-contact__text">
              Fill out the short form below or schedule a {' '} 
              {typeof window !== 'undefined' ? (
                <>
                  <button onClick={handleLinkClick}>call with us here</button>
                  <PopupModal
                    url="https://calendly.com/saeedreza/30min"
                    rootElement={document.body}
                    onModalClose={() => setIsOpen(false)}
                    open={isOpen}
                  />
                </>
              ) : null}
              .
            </div>
            <div className="gform_wrapper gravity-theme">
              <form
                noValidate
                className={`c-form ${
                  mutationData?.submitGfForm?.confirmation ? 'is-hidden' : ''
                }`}
                onSubmit={(event) => {
                  event.stopPropagation();
                  event.preventDefault();

                  // const errors = {};
                  // formFields.nodes.forEach((field) => {
                  //   if (field.isRequired && field.type === 'CHECKBOX') {
                  //     if (!fieldValues[field.databaseId] || fieldValues[field.databaseId].length === 0) {
                  //       errors[field.databaseId] = 'This field is required';
                  //     }
                  //   }
                  // });

                  // console.log(errors)
                  // if (Object.keys(errors).length > 0) {
                  //   setValidationErrors(errors);
                  //   return;
                  // }

                  const values = Object.entries(fieldValues).map(
                    ([key, value]) => {
                      let inputObject = { id: Number(key), value };

                      if (key === '4') {
                        inputObject = {
                          ...inputObject,
                          emailValues: {
                            confirmationValue: '',
                            value,
                          },
                        };
                      }

                      if (key === '10') {
                        const choices = formFields.nodes.find(
                          (field) => field.databaseId.toString() === key
                        ).choices;
                  
                        if (choices) {
                          const checkboxValues = choices.map((choice, index) => ({
                            inputId: parseFloat(`${inputObject.id}.${index + 1}`),
                            value: value.includes(choice.value) ? choice.value : "",
                          }));
                  
                          inputObject = { id: inputObject.id, checkboxValues };
                        }
                      }
                      

                      return inputObject;
                    }
                  );

                  submitForm({
                    variables: {
                      fieldValues: values,
                    },
                  });
                }}
              >
                <div className="gform-body gform_body">
                  <div className="gform_fields top_label form_sublabel_below description_below">
                  {formFields.nodes.map((field, index) => {
                    const {
                      type,
                      inputName,
                      isRequired,
                      label,
                      placeholder,
                      databaseId,
                      choices,
                      visibility,
                      cssClass,
                    } = field;
                    const error = mutationData?.submitGfForm?.errors?.find(
                      (e) => e.id === databaseId
                    );

                    return (
                      <div
                        className={[
                          'gfield',
                          `gfield--type-${type.toLowerCase()}`,
                          ['textarea', 'checkbox'].includes(type.toLowerCase()) || (cssClass && cssClass.includes('has-full-width')) 
                            ? 'gfield--width-full' 
                            : 'gfield--width-half',
                          error ? 'gfield_error' : '',
                          cssClass ? cssClass : '',
                          visibility === 'HIDDEN' ? 'gfield_visibility_hidden' : 'gfield_visibility_visible',
                        ].join(' ')}
                        key={index}
                      >
                        <label
                          className="gfield_label gform-field-label"
                          htmlFor={`input_${formId}_${databaseId}`}
                        >
                          {label}{' '}
                          {isRequired ? (
                            <span className="gfield_required gfield_required_asterisk">*</span>
                          ) : (
                            ''
                          )}
                        </label>
                        <div className={`ginput_container ginput_container_${type.toLowerCase()}`}>
                          {type === 'TEXTAREA' ? (
                            <textarea
                              placeholder={placeholder}
                              name={inputName}
                              value={fieldValues[databaseId]}
                              id={`input_${formId}_${databaseId}`}
                              className="c-textarea"
                              aria-required={isRequired}
                              onChange={(event) => {
                                setFieldValues({
                                  ...fieldValues,
                                  [databaseId]: event.target.value,
                                });
                              }}
                            />
                          ) : type === 'CHECKBOX' ? (
                            choices.map((choice, idx) => (
                              <div key={idx}>
                                <input
                                  type="checkbox"
                                  name={inputName}
                                  id={`selectfield-${idx}`}
                                  value={choice.value}
                                  checked={fieldValues[databaseId]?.includes(choice.value) ?? false}
                                  onChange={(event) => {
                                    const newValue = [...(fieldValues[databaseId] ?? [])];
                                    if (event.target.checked) {
                                      newValue.push(choice.value);
                                    } else {
                                      const index = newValue.indexOf(choice.value);
                                      if (index > -1) {
                                        newValue.splice(index, 1);
                                      }
                                    }
                                    setFieldValues({
                                      ...fieldValues,
                                      [databaseId]: newValue,
                                    });
                                  }}
                                />
                              <label htmlFor={`selectfield-${idx}`}>
                                {choice.text}
                              </label>
                            </div>
                            ))
                          ) : type === 'SELECT' ? (
                            <select
                              name={inputName}
                              id={`input_${formId}_${databaseId}`}
                              className='c-form-select'
                              value={fieldValues[databaseId]}
                              onChange={(event) => {
                                setFieldValues({
                                  ...fieldValues,
                                  [databaseId]: event.target.value,
                                });
                              }}
                            >
                              <option defaultValue disabled>{placeholder}</option>
                              {choices.map((choice, idx) => (
                                <option key={idx} value={choice.value}>
                                  {choice.text}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              placeholder={placeholder}
                              name={inputName}
                              type={convertInputType(type)}
                              value={fieldValues[databaseId]}
                              id={`input_${formId}_${databaseId}`}
                              aria-required={isRequired}
                              onChange={(event) => {
                                setFieldValues({
                                  ...fieldValues,
                                  [databaseId]: event.target.value,
                                });
                              }}
                            />
                          )}
                        </div>
                        {error ? (
                          <div
                            id={`validation_message_${formId}_${databaseId}`}
                            className="gfield_description validation_message gfield_validation_message"
                          >
                            {error.message}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}

                  </div>
                </div>
                <div className="gform_footer top_label">
                  <button
                    type="submit"
                    disabled={loading}
                    className="c-btn c-btn--primary is-btn-light gform_button button"
                  >
                    {loading ? <SpinnerIcon /> : 
                      ( 
                      <>
                        <span>{submitButton.text}</span>
                        <div className="c-btn__icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                              <path d="M6 18 18 6M8.25 6H18v9.75"/>
                            </g>
                          </svg>
                        </div>
                      </>
                      )
                    }
                  </button>
                </div>
              </form>
              {mutationData?.submitGfForm?.confirmation ? (
                <div className="gform_confirmation_message">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="112"
                    viewBox="0 0 112 112"
                    fill="none"
                  >
                    <g fill="#59CC51" clipPath="url(#a)">
                      <path d="M108.798 15.311a4.22 4.22 0 0 0-5.968-.007L52.19 65.81 33.92 45.966a4.221 4.221 0 0 0-6.21 5.718l21.246 23.074a4.216 4.216 0 0 0 3.105 1.362c1.116 0 2.19-.443 2.98-1.23L108.79 21.28a4.22 4.22 0 0 0 .008-5.97Z"></path>
                      <path d="M107.779 51.779A4.22 4.22 0 0 0 103.558 56c0 26.224-21.334 47.558-47.558 47.558-26.223 0-47.558-21.334-47.558-47.558C8.442 29.777 29.777 8.442 56 8.442A4.22 4.22 0 1 0 56 0C25.121 0 0 25.121 0 56c0 30.877 25.121 56 56 56 30.877 0 56-25.123 56-56a4.221 4.221 0 0 0-4.221-4.221Z"></path>
                    </g>
                  </svg>
                  <h4>
                    Thanks for contacting us! We will get in touch with you
                    shortly.
                  </h4>
                </div>
              ) : null}
            </div>
          </div>
          <div className='c-contact__col'>
            <div className='c-sticky-box'>
            <div className="c-learnmore">
              <div className='c-learnmore__box'>
                <div className='c-section'>
                  <h3 className='c-section__title'>Want to learn more?</h3>
                  <div className='c-section__desc'>Explore our projects, follow us on LinkedIn, subscribe to our newsletter, and check out our blog for the latest in digital media.</div>
                </div>
                <div className='c-learnmore__links'>
                  <Button
                    target='_blank'
                    text='subscribe to newsletter'
                    type={BtnType.SECONDARY}
                    bgMode={BgMode.LIGHT}
                    url='https://www.mediatech.report/'
                  />
                  <Button
                    text='view our work'
                    type={BtnType.SECONDARY}
                    bgMode={BgMode.LIGHT}
                    url='/work'
                  />
                  <Button
                    text='read our blog'
                    type={BtnType.SECONDARY}
                    bgMode={BgMode.LIGHT}
                    url='/insights'
                  />
                  <Button
                    target='_blank'
                    text='Follow us on linkedin'
                    type={BtnType.SECONDARY}
                    bgMode={BgMode.LIGHT}
                    url='https://www.linkedin.com/company/refactco/'
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </ContainerBox>
      <ContainerBox className='c-section--clutch'>
        <ClutchWidget />
      </ContainerBox>
    </Layout>
  );
};

export default ContactPage;

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
    wpPage(slug: { eq: "contact" }) {
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
            cssClass
            visibility
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
            defaultValue
          }
          ... on WpTextAreaField {
            inputName
            isRequired
            label
            placeholder
          }
          ... on WpCheckboxField {
            isRequired
            inputName
            label
            choices {
              text
              value
            }
          }
          ... on WpSelectField {  
            isRequired
            type
            label
            placeholder
            choices {
              text
              value
            }
          }
        }
      }
    }
  }
`;
