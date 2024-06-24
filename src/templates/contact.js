import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import { Link, graphql } from 'gatsby';
import React, { useState } from 'react';
import { PopupModal } from 'react-calendly';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';

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
        <ContainerBox className="o-section c-section--page-header is-page-contact">
          <div className="c-page-header is-full">
            {heroSection.subtitle ? (
              <div className="c-page-header__sub-title">
                {heroSection.subtitle}
              </div>
            ) : null}
            <h1 className="c-page-header__title" style={{ maxWidth: 745 }}>
              {heroSection.title}
            </h1>
            <div
              className="c-page-header__text"
              dangerouslySetInnerHTML={{ __html: heroSection.text }}
            ></div>
            {heroSection.cta ? (
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
            ) : null}
          </div>
        </ContainerBox>
      ) : null}
      <ContainerBox className="c-section--contact">
        <div className="c-contact">
          <div className="c-contact__text">
            Reach out via the form below or schedule a
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
          <h2
            className={`c-contact-form__title ${
              mutationData?.submitGfForm?.confirmation ? 'is-hidden' : ''
            }`}
          >
            Let's chat.
          </h2>
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
                  } = field;
                  const error = mutationData?.submitGfForm?.errors?.find(
                    (e) => e.id === databaseId
                  );

                  return (
                    <div
                      className={[
                        'gfield',
                        `gfield--type-${type.toLowerCase()}`,
                        'gfield--width-full',
                        error ? 'gfield_error' : '',
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
                  className="gform_button button"
                >
                  {loading ? 'Loading...' : submitButton.text}
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
          <div className="c-contact-footer__info s-content">
            <h4 className="c-contact-info__title">Not ready to chat?</h4>
            <p className="c-contact-info__text">
              Why not take a moment to browse through our previous projects? Let
              our work inspire you! And for a regular dose of inspiration, make
              sure to follow us and keep up with all the exciting developments
              in digital media. We're constantly updating our feeds with fresh,
              innovative ideas, and we'd love to share our world of creativity
              with you.
            </p>
            <div className="c-contact-info__social">
              <div className="c-contact-info__social-item">
                <a
                  href="https://www.linkedin.com/company/refactco/"
                  target="_blank"
                  aria-label="Refact Linkedin Profile"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    data-name="Group 1280"
                    viewBox="0 0 267.504 65.326"
                  >
                    <path
                      fill="#0a66c2"
                      d="M263.744 61.109a1.2 1.2 0 0 0 1.21-1.269c0-.9-.543-1.33-1.657-1.33h-1.8v4.712h.677v-2.054h.832l.019.025 1.291 2.029h.724l-1.389-2.1Zm-.783-.472h-.785v-1.593h.995c.514 0 1.1.084 1.1.757 0 .774-.593.836-1.314.836"
                      data-name="Path 2525"
                    />
                    <path
                      fill="#0a66c2"
                      d="M0 9.587h9.993v36.4h18.5v9.222H0Z"
                      data-name="Path 2514"
                    />
                    <path
                      fill="#0a66c2"
                      d="M32.911 24.276h9.6v30.916h-9.6Zm4.8-15.37a5.569 5.569 0 1 1-5.57 5.569 5.569 5.569 0 0 1 5.57-5.569"
                      data-name="Path 2515"
                    />
                    <path
                      fill="#0a66c2"
                      d="M82.669 9.58h9.6v27.265l10.88-12.583h11.77l-12.6 14.313 12.335 16.63h-12.066L92.397 39.923h-.126v15.28h-9.6Z"
                      data-name="Path 2516"
                    />
                    <path
                      fill="#0a66c2"
                      d="M47.834 24.279h9.219v4.225h.131a10.085 10.085 0 0 1 9.09-4.994c9.735 0 11.527 6.405 11.527 14.726V55.19h-9.6V40.159c0-3.588-.066-8.2-5-8.2-4.99 0-5.76 3.907-5.76 7.939v15.288h-9.6Z"
                      data-name="Path 2517"
                    />
                    <path
                      fill="#0a66c2"
                      d="M135.136 36.138a5.756 5.756 0 0 0-5.894-5.89 6.406 6.406 0 0 0-6.784 5.89Zm8.132 13.7a16.909 16.909 0 0 1-13.128 6.151c-9.6 0-17.286-6.408-17.286-16.331s7.685-16.328 17.286-16.328c8.973 0 14.6 6.4 14.6 16.328v3.01h-22.282a7.171 7.171 0 0 0 7.235 6.019 8.193 8.193 0 0 0 6.851-3.778Z"
                      data-name="Path 2518"
                    />
                    <path
                      fill="#0a66c2"
                      d="M164.75 31.749c-4.8 0-7.68 3.205-7.68 7.875s2.879 7.878 7.68 7.878 7.687-3.2 7.687-7.878-2.881-7.875-7.687-7.875m16.525 23.437h-8.838v-4.1h-.131a12.071 12.071 0 0 1-9.544 4.868c-9.224 0-15.3-6.657-15.3-16.071 0-8.646 5.377-16.585 14.216-16.585 3.973 0 7.684 1.087 9.861 4.1h.126V9.577h9.609Z"
                      data-name="Path 2519"
                    />
                    <path
                      fill="#0a66c2"
                      d="M246.084 55.204h-9.6V40.17c0-3.585-.064-8.2-4.993-8.2-5 0-5.765 3.906-5.765 7.939v15.294h-9.6V24.287h9.216v4.225h.129a10.1 10.1 0 0 1 9.093-4.994c9.73 0 11.524 6.4 11.524 14.726Zm-40.79-35.143a5.571 5.571 0 1 1 5.57-5.572 5.571 5.571 0 0 1-5.57 5.572m4.8 35.143h-9.61V24.287h9.61ZM250.87.004h-55.21a4.728 4.728 0 0 0-4.781 4.67v55.439a4.731 4.731 0 0 0 4.781 4.675h55.21a4.741 4.741 0 0 0 4.8-4.675V4.67a4.738 4.738 0 0 0-4.8-4.67"
                      data-name="Path 2520"
                    />
                    <path
                      fill="#0a66c2"
                      d="M263.043 56.411a4.418 4.418 0 1 0 .085 0h-.085m0 8.33a3.874 3.874 0 1 1 3.809-3.938v.065a3.791 3.791 0 0 1-3.708 3.871h-.1"
                      data-name="Path 2526"
                    />
                  </svg>
                </a>
              </div>
              <div className="c-contact-info__social-item">
                <a
                  href="https://clutch.co/profile/refact"
                  className="c-link"
                  target="_blank"
                  aria-label="Refact Client Reviews"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="75"
                    viewBox="0 0 87.861 25"
                  >
                    <path
                      fill="#000"
                      d="M22.861 0h4v25h-4zM40.861 17.025c0 3.826-3.217 4.131-4.174 4.131-2.391 0-2.826-2.238-2.826-3.588V8h-4v9.548c0 2.37.744 4.326 2.048 5.63 1.152 1.153 2.878 1.783 4.748 1.783 1.326 0 3.204-.413 4.204-1.326V25h4V8h-4v9.025zM52.861 2h-4v6h-3v4h3v13h4V12h3V8h-3zM68.458 19.917c-.871.783-2.021 1.217-3.283 1.217-2.782 0-4.825-2.043-4.825-4.848s1.978-4.762 4.825-4.762c1.24 0 2.412.413 3.305 1.196l.607.522 2.697-2.696-.675-.609C69.522 8.504 67.415 7.7 65.174 7.7c-5 0-8.631 3.608-8.631 8.565 0 4.936 3.718 8.673 8.631 8.673 2.283 0 4.412-.804 5.979-2.26l.652-.609-2.739-2.694-.608.542zM86.061 9.482C84.909 8.33 83.559 7.7 81.689 7.7c-1.326 0-2.828.413-3.828 1.325V0h-4v25h4v-9.365c0-3.826 2.718-4.13 3.675-4.13 2.391 0 2.325 2.239 2.325 3.587V25h4v-9.887c0-2.37-.495-4.326-1.8-5.631"
                    />
                    <path
                      fill="#E62415"
                      d="M65.043 13.438a2.891 2.891 0 1 1 0 5.784 2.891 2.891 0 0 1 0-5.784"
                    />
                    <path
                      fill="#000"
                      d="M17.261 18.721c-1.521 1.565-3.587 2.413-5.761 2.413-4.456 0-7.696-3.5-7.696-8.304 0-4.826 3.24-8.326 7.696-8.326 2.153 0 4.196.847 5.74 2.391l.608.609 2.674-2.674-.587-.609C17.718 1.938 14.718.7 11.5.7 4.935.7 0 5.917 0 12.851 0 19.764 4.957 24.96 11.5 24.96c3.24 0 6.24-1.26 8.457-3.543l.587-.609-2.652-2.717-.631.63z"
                    />
                  </svg>
                </a>
              </div>
            </div>
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
      <Seo title={post.seo.title} description={post.seo.metaDesc} />
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
