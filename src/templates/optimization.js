import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from "../components/layout/layout";
import ContainerBox from '../components/container-box/container-box';
import Seo from '../components/seo/seo';
import "slick-carousel/slick/slick.css";
import PatternBg from '../components/patterns/pattern-bg';
import Button, {BgMode, BtnType} from '../components/button/button';
import SpinnerIcon from '../components/spinner/spinner';

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

const OptimizationPage = ({ data }) => {
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

  const { wpGfForm } = data;
  const initialFieldValues = wpGfForm.formFields.nodes.reduce((acc, field) => {
    if (field.type === 'SELECT' && field.choices.length > 0) {
      acc[field.databaseId] = field.placeholder;
    } else {
      acc[field.databaseId] = field.defaultValue ?? '';
    }
    return acc;
  }, {});

  const [fieldValues, setFieldValues] = useState(initialFieldValues);
  const formId = 9;
  const { submitButton, formFields } = wpGfForm;

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
  const renderSection = (section, index) => {
    switch (section.fieldGroupName) {
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
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader':
        return (
          <ContainerBox key={index} className="c-section--work c-section--services">
          <div className="c-page-header is-full">
            <h1 className="c-page-header__title">
              {section.title}
            </h1>
            <div
              className="c-page-header__text"
              dangerouslySetInnerHTML={{ __html: section.text }}
              style={{ maxWidth: 796 }}
            ></div>
          </div>
          <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
          <PatternBg pattern="heroPatternBig" className='is-hero-pattern-big' />
        </ContainerBox>
        )
        case 'Template_PageBuilder_Pagebuilder_PageBuilder_CapabilitiesList':
          return (
            <ContainerBox key={index} className="c-section--capabilites has-services">
              <div className="c-capabilites">
                <div className='c-section'>
                  <h2 className="c-section__title">Our Services</h2>
                </div>
                {section.list && (
                  <div className="c-sf__list">
                    {section.list.map((item, index) => (
                      <div className="c-capabilites-list__items"  key={index}>
                        <div className='c-capabilites-list__info'>
                          <div className="c-sf__num">0{index+1}</div>
                          <div className="c-sf__title">{item.title}</div>
                          <div className="c-sf__text" dangerouslySetInnerHTML={{__html: item.text}} />
                        </div>
                        {item.cta && (
                          <Button
                          url={item.cta.url}
                          text={item.cta.title}
                          title={item.title}
                          type={BtnType.SECONDARY}
                          bgMode={BgMode.LIGHT}
                        />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ContainerBox>
          )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextSection':
        return (
          <ContainerBox key={index} className={`c-section--capabilites is-text-section has-text-${index}`}>
            <div className="c-capabilites">
              <div className='c-section mb-0' style={{maxWidth: 768}}>
                {section.title && (
                  <h2 className="c-section__title">{section.title}</h2>
                )}
                {section.description && (
                  <div className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}} />
                )}
              </div>
            </div>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites':
        return (
          <ContainerBox key={index} className="c-section--capabilites">
          <div className="c-capabilites">
            {section.items && (
              <div className="c-sf__list">
                <div className="c-capabilites-list__items has-no-bg">
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
                  <div className="c-capabilites-list__items" key={index}>
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
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextButton':
        return (
          <ContainerBox key={index} className={`c-section--our-partners is-industry-expert`}>
          <div className="c-our-partners">
            <div className='c-section is-center'>
              {section.title && (
              <h2 className='c-section__title'>{section.title}</h2>
              )}
              {section.description && (
              <div className='c-section__desc' dangerouslySetInnerHTML={{__html:section.description}} />
              )}
              {section.cta && (
                <div className='c-section__cta'>
                  <Button 
                    target={section.cta.target} 
                    url={section.cta.url} 
                    text={section.cta.title} 
                    type={BtnType.PRIMARY} 
                    bgMode={BgMode.LIGHT} 
                  />
                </div>
              )}
            </div>
          </div>
          <PatternBg pattern="lightTop" className='is-our-partners' />
        </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Faqs':
        return (
          <ContainerBox key={index} className={`c-section--faq is-about-page has-green-bg`}>
            <div className="c-faq">
              <div className='c-faq__col'>
                <div className='c-section'>
                  <h2 className="c-section__title">Refact handles these common concerns.</h2>
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
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
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
        case 'Template_PageBuilder_Pagebuilder_PageBuilder_Project':
          return (
            <ContainerBox key={index} className={`c-section--project-home is-work-page is-services`}>
              {section.title && (
                <div className="c-project__header">
                  <div className="c-page-header__sub-title c-sf__headline">{section.subhead}</div>
                  <div className="c-sf__desc">
                    {section.title}
                  </div>
                </div>
              )}
              {section.projectList && (
                  <div className="c-projects">
                    {section.projectList.map((project, index) => {
                      let imgClasses = "c-project__imgs media media--hover-effect media--landscape";
                      return(
                        <div className={`c-projects__item c-projects__item-${section.displayMode === 'normal' ? index : index + 3} is-media-${project.mediaSettings}`} key={index}>
                          <div className='c-projects-item__col'>
                            {project.cta.target === '_blank' ?
                              <a href={project.cta.url} target={project.cta.target} rel="noopener noreferrer" className={imgClasses} title={project.title}>
                                {(project.mediaSettings === 'image' || project.mediaSettings === 'both') && (
                                  <GatsbyImage image={project.cover.localFile.childImageSharp.gatsbyImageData} alt={project.cover.altText} />
                                )}
                                {(project.mediaSettings === 'video' || project.mediaSettings === 'both') && (
                                  <video
                                    alt={project.video.altText}
                                    width={project.video.width}
                                    height={project.video.height}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    >
                                      <source src={project.video.localFile.url} type={project.video.mimeType} />
                                      Your browser does not support the video tag.
                                  </video>
                                )}
                              </a>
                              :
                              <Link to={project.cta.url} className={imgClasses} title={project.title}>
                                {(project.mediaSettings === 'image' || project.mediaSettings === 'both') && (
                                  <GatsbyImage image={project.cover.localFile.childImageSharp.gatsbyImageData} alt={project.cover.altText} />
                                )}
                                {(project.mediaSettings === 'video' || project.mediaSettings === 'both') && (
                                  <video
                                    alt={project.video.altText}
                                    width={project.video.width}
                                    height={project.video.height}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    >
                                    <source src={project.video.localFile.url} type={project.video.mimeType} />
                                    Your browser does not support the video tag.
                                  </video>
                                )}
                              </Link>
                            }
                          </div>
                          <div className='c-projects-item__col'>
                            <div className='c-projects-item__info'>
                              <h4 className='c-project__title'>
                              {project.cta.target === '_blank' ?
                                <a href={project.cta.url} target={project.cta.target} rel="nofollow, noopener" className='c-link c-link--blog'>
                                {project.title}
                                </a>
                                :
                                <Link to={project.cta.url} className='c-link c-link--blog'>
                                {project.title}
                                </Link>
                              }
                              </h4>
                              <div className='c-project__text'>{project.description}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              {section.cta && (
                <div className='c-sf__cta'>
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
                </div>
              )}
            </ContainerBox>
          )
        case 'Template_PageBuilder_Pagebuilder_PageBuilder_Contact':
          return (
            <ContainerBox key={index} className="c-section--contact is-contact-page has-contact-part">
              <div className="c-faq">
                <div className='c-faq__col'>
                  <div className='c-section'>
                    <h2 className="c-section__title">{section.title}</h2>
                  </div>
                </div>
                <div className='c-faq__col'>
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
              </div>
              <PatternBg pattern="lightLeft" className='is-pattern-client' />
            </ContainerBox>
          )
      default:
        return null
    }
  }
  const backtobasicContent = data.wpPage.template.pageBuilder.pageBuilder;
  return (
    <Layout>
      {backtobasicContent.map((section, index) => (
          renderSection(section, index)
      ))}
    </Layout>
  );
};

export default OptimizationPage;

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
    wpPage(slug: {eq: "optimization"}) {
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
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Contact {
                title
                text
                fieldGroupName
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Project {
                fieldGroupName
                cta {
                  target
                  title
                  url
                }
                displayMode
                projectList {
                  cover {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  video{
                    altText
                    filename
                    localFile {
                      url
                      id
                    }
                    height
                    width
                    mimeType
                  }
                  cta {
                    target
                    title
                    url
                  }
                  mediaSettings
                  description
                  fieldGroupName
                  title
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
                description
                fieldGroupName
                items {
                  fieldGroupName
                  title
                  text
                }
                title
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                fieldGroupName
                list {
                  answer
                  question
                  fieldGroupName
                }
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
