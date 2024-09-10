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
      <ContainerBox className="c-section--contact">
        <div className="c-contact">
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
      </ContainerBox>
      <ContainerBox className='c-section--clutch'>
        <ClutchWidget />
      </ContainerBox>
      <ContainerBox className="c-section--learnmore">
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
          <div className='c-learnmore__box'>
            <img className='c-learnmore__image' width="1040" height="850" loading='lazy' src='/clutch-bg.png' alt='clutch' />
            <div className='c-learnmore__wrao'>
              <div className='c-learnmore__clutch'>
                <div className='c-learnmore-clutch__logo'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="113" height="32" fill="none" viewBox="0 0 113 32"><path fill="#17313B" d="M29.295 0h5.183v32h-5.183V0ZM52.508 21.86c0 4.957-4.057 5.408-5.409 5.408-3.155 0-3.605-2.93-3.605-4.507V10.366H38.31v12.17c0 2.929.902 5.633 2.705 7.21C42.592 31.325 44.62 32 47.099 32c1.803 0 4.057-.45 5.409-1.803V32h5.183V10.366h-5.183V21.86ZM67.83 2.479h-5.183v7.887h-3.83v4.958h3.83V32h5.184V15.324h3.83v-4.958h-3.83V2.48ZM110.423 12.169c-1.577-1.578-3.155-2.254-5.634-2.254-1.803 0-3.605.451-4.957 1.803V0h-5.184v32h5.184V20.056c0-4.958 3.38-5.408 4.732-5.408 3.155 0 2.929 2.93 2.929 4.507v12.62h5.184V19.38c0-2.93-.677-5.634-2.254-7.211ZM87.888 25.465c-1.126.901-2.704 1.577-4.281 1.577-3.606 0-6.085-2.704-6.085-6.31 0-3.605 2.479-6.084 6.085-6.084 1.577 0 3.155.45 4.281 1.577l.676.676 3.606-3.38-.901-.676a11.555 11.555 0 0 0-7.662-2.93c-6.31 0-11.043 4.733-11.043 11.043S77.297 32 83.607 32c2.93 0 5.633-1.127 7.662-2.93l.901-.676-3.606-3.605-.676.676Z"/><path fill="#EF4335" d="M83.381 24.563a3.606 3.606 0 1 0 0-7.21 3.606 3.606 0 0 0 0 7.21Z"/><path fill="#17313B" d="M22.084 24.113c-1.802 1.802-4.507 2.93-7.436 2.93-5.634 0-9.69-4.508-9.69-10.592 0-6.085 4.056-10.592 9.915-10.592 2.704 0 5.409 1.127 7.437 3.155l.676.676 3.38-3.38-.676-.676c-2.93-2.93-6.76-4.507-10.817-4.507C6.31.9 0 7.662 0 16.45 0 25.239 6.31 32 14.648 32c4.056 0 8.113-1.578 10.817-4.507l.676-.676-3.38-3.38-.677.675Z"/></svg>
                </div>
                <div className='c-learnmore-clutch__text'>
                  See what our clients have to say on Clutch.
                </div>
              </div>
              <div className='c-learnmore__clutch-link'>
                <a
                  href='https://clutch.co/profile/refact'
                  target='_blank'
                  rel='noreferrer'
                  className='c-btn c-btn--primary is-btn-light'
                >
                  <span className='c-btn-text'>
                    <span className='c-icon-review'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="22" fill="none" viewBox="0 0 120 22"><path fill="#fff" d="M5.08 17.16c-.758 0-1.436-.143-2.035-.427a3.627 3.627 0 0 1-1.426-1.182 3.128 3.128 0 0 1-.556-1.716h2.045c.038.477.244.868.62 1.17.374.3.825.45 1.352.45.412 0 .78-.095 1.102-.284.322-.19.576-.453.761-.79.186-.337.277-.722.273-1.154.004-.44-.09-.83-.279-1.17a2.082 2.082 0 0 0-.778-.801 2.172 2.172 0 0 0-1.136-.296 2.706 2.706 0 0 0-1.029.193 2.105 2.105 0 0 0-.8.523l-1.904-.312.608-6h6.75v1.761H3.642l-.335 3.085h.068c.216-.254.52-.464.915-.63.394-.17.826-.256 1.295-.256.705 0 1.334.167 1.887.5.553.33.988.784 1.306 1.364.319.579.478 1.242.478 1.988 0 .77-.178 1.455-.534 2.057a3.779 3.779 0 0 1-1.472 1.415c-.625.34-1.348.511-2.17.511Zm6.978-.035c-.345 0-.64-.121-.886-.364a1.178 1.178 0 0 1-.364-.886c-.003-.34.118-.633.364-.875s.541-.364.886-.364c.334 0 .623.122.87.364a1.194 1.194 0 0 1 .198 1.506c-.113.19-.265.34-.454.454-.186.11-.39.165-.614.165Zm7.2.097c-.936 0-1.74-.237-2.41-.71-.667-.478-1.18-1.165-1.54-2.063-.356-.902-.534-1.987-.534-3.256.004-1.269.184-2.348.54-3.238.36-.894.873-1.576 1.54-2.046.67-.47 1.471-.704 2.403-.704.932 0 1.733.234 2.403.704.671.47 1.184 1.152 1.54 2.046.36.893.54 1.973.54 3.238 0 1.273-.18 2.36-.54 3.261-.356.898-.869 1.584-1.54 2.057-.666.474-1.467.71-2.403.71Zm0-1.779c.726 0 1.3-.358 1.72-1.074.425-.72.637-1.778.637-3.176 0-.924-.096-1.7-.29-2.33-.193-.628-.466-1.102-.818-1.42a1.791 1.791 0 0 0-1.25-.483c-.723 0-1.295.36-1.716 1.08-.42.716-.632 1.767-.636 3.153-.004.928.089 1.709.278 2.341.193.633.466 1.11.818 1.432.353.318.771.477 1.256.477Z"/><path fill="#FF260A" d="m38.235 5.154 1.712 3.639 3.828.583c.049.008.094.03.132.063a.288.288 0 0 1 .014.408l-2.77 2.831.654 4a.287.287 0 0 1-.015.15.273.273 0 0 1-.089.119.256.256 0 0 1-.277.02L38 15.08l-3.423 1.888a.253.253 0 0 1-.277-.02.273.273 0 0 1-.09-.12.286.286 0 0 1-.014-.15l.653-4-2.77-2.832a.288.288 0 0 1 .014-.408.259.259 0 0 1 .132-.062l3.828-.583 1.713-3.64a.269.269 0 0 1 .096-.111.253.253 0 0 1 .277 0 .269.269 0 0 1 .096.112ZM57.235 5.154l1.712 3.639 3.828.583c.049.008.094.03.132.063a.288.288 0 0 1 .014.408l-2.77 2.831.654 4a.287.287 0 0 1-.015.15.273.273 0 0 1-.089.119.256.256 0 0 1-.277.02L57 15.08l-3.423 1.888a.253.253 0 0 1-.277-.02.273.273 0 0 1-.09-.12.286.286 0 0 1-.014-.15l.653-4-2.77-2.832a.288.288 0 0 1 .014-.408.259.259 0 0 1 .132-.062l3.828-.583 1.713-3.64a.269.269 0 0 1 .096-.111.253.253 0 0 1 .277 0 .269.269 0 0 1 .096.112ZM76.235 5.154l1.712 3.639 3.828.583c.049.008.094.03.132.063a.288.288 0 0 1 .014.408l-2.77 2.831.654 4a.287.287 0 0 1-.015.15.273.273 0 0 1-.089.119.256.256 0 0 1-.277.02L76 15.08l-3.423 1.888a.253.253 0 0 1-.277-.02.273.273 0 0 1-.09-.12.286.286 0 0 1-.014-.15l.653-4-2.77-2.832a.288.288 0 0 1 .014-.408.259.259 0 0 1 .132-.062l3.828-.583 1.713-3.64a.269.269 0 0 1 .096-.111.253.253 0 0 1 .277 0 .269.269 0 0 1 .096.112ZM95.235 5.154l1.712 3.639 3.828.583a.26.26 0 0 1 .132.063.287.287 0 0 1 .014.408l-2.77 2.831.654 4a.287.287 0 0 1-.015.15.273.273 0 0 1-.089.119.256.256 0 0 1-.277.02L95 15.08l-3.423 1.888a.253.253 0 0 1-.277-.02.273.273 0 0 1-.09-.12.286.286 0 0 1-.014-.15l.653-4-2.77-2.832a.288.288 0 0 1 .014-.408.259.259 0 0 1 .132-.062l3.828-.583 1.713-3.64a.269.269 0 0 1 .096-.111.253.253 0 0 1 .277 0 .269.269 0 0 1 .096.112ZM114.235 5.154l1.712 3.639 3.828.583a.26.26 0 0 1 .132.063.287.287 0 0 1 .014.408l-2.77 2.831.654 4a.284.284 0 0 1-.104.269.254.254 0 0 1-.277.021L114 15.08l-3.423 1.888a.256.256 0 0 1-.366-.14.275.275 0 0 1-.015-.15l.653-4-2.77-2.832a.287.287 0 0 1 .014-.408.26.26 0 0 1 .132-.062l3.828-.583 1.713-3.64A.263.263 0 0 1 114 5c.049 0 .097.014.139.042a.27.27 0 0 1 .096.112Z"/></svg>
                    </span>
                    visit our clutch profle</span>
                  <div className="c-btn__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M6 18 18 6M8.25 6H18v9.75"/>
                      </g>
                    </svg>
                  </div>
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
