import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CampaignURLGeneratorHelper } from './campaign-url-generator-helper';
import ContainerBox from '../container-box/container-box';
// import './index.css'

const CampaignURLGenerator = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const { handleSubmit: handleSubmitUTMForm, register: registerUTMForm , formState: { errors: errorsUTMForm } } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const [state, setState] = useState({
    generatedURL: '',
    generatedChannel: '',
    campaignSource: '',
    campaignID: '',
    campaignName: '',
    campaignMedium: '',
    campaignTerm: '',
    campaignContent: '',
  });

  const { generatedURL, generatedChannel, campaignSource, campaignID, campaignName, campaignMedium, campaignTerm, campaignContent } = state;
  const helper = CampaignURLGeneratorHelper(state, setState, setValue);

  const [copyStatus, setCopyStatus] = useState('Copy');

  const copyToClipboard = () => {
    const inputField = document.querySelector('.c-utm-box__generated-item input');

    navigator.clipboard.writeText(inputField.value)
      .then(() => {
        console.log('Text copied to clipboard');
        setCopyStatus('Copied!');
        // Reset copy status after a short delay
        setTimeout(() => {
          setCopyStatus('Copy');
        }, 1500); // Adjust the delay as needed
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard', err);
      });
  };
  const [activeTab, setActiveTab] = useState('utmGenerator');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ContainerBox className='c-section--utm-builder'>
      <div className='c-utm-builder'>
        <div className="c-utm-builder__tabs">
          <button
            className={`c-utm-builder__tab ${activeTab === 'utmGenerator' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('utmGenerator')}
            role="tab"
            aria-selected={activeTab === 'utmGenerator' ? 'true' : 'false'}
          >
            UTM Generator
          </button>
          <button
            className={`c-utm-builder__tab ${activeTab === 'utmValidator' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('utmValidator')}
            role="tab"
            aria-selected={activeTab === 'utmValidator' ? 'true' : 'false'}
          >
            UTM Validator
          </button>
        </div>
        <div className="c-utm-builder__content">
          <div className="c-utm-builder-content__items is-utm-generator" style={{ display: activeTab === 'utmGenerator' ? 'block' : 'none' }}>
            <h4 className="c-utm-builder__title">Create correct UTM links to track your traffic sources and campaigns. Just enter your campaign details and get the your URL.</h4>
            <div className="c-utm-builder__row">
              <div className="c-utm-builder__col">
                <form className='c-utm-generator__form' onSubmit={handleSubmit(helper.submitHandler)}>
                  <div className={`c-utm-form__items ${errors.websiteUrl ? 'is-error' : ''}`}>
                    <label htmlFor="websiteUrl">Your URL *</label>
                    <input
                      type="text"
                      id="websiteUrl"
                      placeholder='https://www.example.com/awesome-landing/'
                      {...register('websiteUrl', {
                        required: 'This field is required.',
                        pattern: {
                          value: /https?:\/\/(www\.[a-zA-Z0-9@:%._+~#=]{2,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)|(?!www)[a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))/,
                          message: 'Please enter a valid Website URL',
                        },
                      })}
                    />
                    {errors.websiteUrl && <span className="error">{errors.websiteUrl.message}</span>}
                    <span className='c-utm-field__text'>The full URL of the page you want to share. (e.g. https://www.example.com/awesome-landing/).</span>
                  </div>
                  <div className="c-utm-form__items">
                    <label htmlFor="campaignID">Campaign ID</label>
                    <input type="text" placeholder='abc.123' id="campaignID" {...register('campaignID')} />
                    <span className='c-utm-field__text'>You can enter the ID from your Google Ads campaign here to track it.</span>
                  </div>
                  <div className={`c-utm-form__items ${errors.campaignSource ? 'is-error' : ''}`}>
                    <label htmlFor="campaignSource">Campaign Source *</label>
                    <input
                      type="text"
                      id="campaignSource"
                      placeholder='campaign source'
                      {...register('campaignSource', { required: 'This field is required.' })}
                    />
                    {errors.campaignSource && <span className="error">{errors.campaignSource.message}</span>}
                    <span className='c-utm-field__text'>The website or platform that will drive traffic to your URL.</span>
                  </div>
                  <div className={`c-utm-form__items ${errors.campaignMedium ? 'is-error' : ''}`}>
                    <label htmlFor="campaignMedium">Campaign Medium *</label>
                    <input
                      type="text"
                      id="campaignMedium"
                      {...register('campaignMedium', {
                        required: 'This field is required.',
                        pattern: {
                          value: /^[a-zA-Z0-9_]*$/,
                          message: 'Please enter a valid Campaign Medium',
                        }
                      })}
                    />
                    {errors.campaignMedium && <span className="error">{errors.campaignMedium.message}</span>}
                    <span className='c-utm-field__text'>Your digital marketing medium. Google Analytics has some standard medium types (e.g. paid, email, banner, etc.)</span>
                  </div>
                  <div className="c-utm-form__items">
                    <label htmlFor="campaignName">Campaign Name</label>
                    <input type="text" placeholder='campaign name' id="campaignName" 
                    {...register('campaignName')} />
                    <span className='c-utm-field__text'>Use Campaign Name to identify this individual campaign (e.g. summer_promo, blackfriday23, etc.)</span>
                  </div>
                  <div className="c-utm-form__items">
                    <label htmlFor="campaignTerm">Campaign Term</label>
                    <input type="text" placeholder='campaign term' id="campaignTerm" 
                    {...register('campaignTerm')} />
                    {errors.campaignTerm && <span className="error">{errors.campaignTerm.message}</span>}
                    <span className='c-utm-field__text'>Use Campaign Term to identify the keywords you are using in your Google Ads campaign.</span>
                  </div>
                  <div className="c-utm-form__items">
                    <label htmlFor="campaignContent">Campaign Content</label>
                    <input type="text" placeholder='campaign content' id="campaignContent" 
                    {...register('campaignContent')} />
                    <span className='c-utm-field__text'>Use Campaign Content to distinguish different CTAs or other elements in your campaign. Great for A/B testing.</span>
                  </div>
                  <div className="c-utm-form__items">
                    <button className='c-btn c-btn--utm' type="submit">Generate URL</button>
                  </div>
                </form>
              </div>
              <div className="c-utm-builder__col">
                <div className={`c-utm-validate-box ${generatedChannel === 'Other' ? 'is-invalid' : generatedChannel ? 'is-valid' : ''}`}>
                  {generatedChannel === 'Other' ? 
                  <>
                    <div className="c-utm-validate__err">
                      Channel:
                    </div>
                    <div className="c-utm-validate__channel">
                      {generatedChannel === 'Other' ? 'Unassigned' : generatedChannel}
                    </div>
                    <div className="c-utm-validate__err is-text">
                      UTM parameters don’t align with GA4 default channels. Please review for accuracy or <a href='https://support.google.com/analytics/answer/13051316?hl=en' target='_blank' rel="noreferrer">assign a custom channel</a>.
                    </div>
                  </>
                  : 
                  <>
                    <div className="c-utm-validate__text">
                      Channel:
                    </div>
                    <div className="c-utm-validate__channel">
                      {generatedChannel === 'Other' ? 'Unassigned' : generatedChannel}
                    </div>
                    <div className="c-utm-validate__text is-text">
                      UTM parameters verified! The following GA4 default channel is assigned: {generatedChannel}. Your campaign tracking is on target.
                    </div>
                  </>
                  }
                </div>
              </div>
            </div>
            <div className="c-utm-box">
              <div className="c-utm-box__title">Get Your UTM Link:</div>
              <div className="c-utm-box__generated">
                <div className="c-utm-box__generated-item">
                  <input type="text" value={generatedURL} readOnly />
                </div>
                <div className="c-utm-box__generated-item">
                  <button className="c-btn c-btn--utm" onClick={copyToClipboard}>
                    <div className="c-btn__icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" d="M18 5H2v18h16V5Z"/><path stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" d="M5 1h17v20M6 10h8M6 14h8M6 18h4"/></svg>
                    </div>
                    <span>{copyStatus}</span>
                  </button>
                </div>
              </div>
              <span className="c-utm-field__text">Fill out the fields and we will automatically generate your UTM link here.</span>
            </div>
          </div>
          <div className="c-utm-builder-content__items is-utm-validator" style={{ display: activeTab === 'utmValidator' ? 'block' : 'none' }}>
            <h4 className="c-utm-builder__title">Our free UTM Channel Validator makes sure your UTM code is valid and trackable.</h4>
            <form className='c-utm-validator' onSubmit={handleSubmitUTMForm(helper.handleUTMFormSubmit)}>
              <div className={`c-utm-form__items ${errorsUTMForm.utmURL ? 'is-error' : ''}`}>
                <label htmlFor="utmURL">UTM URL *</label>
                <input 
                  type="text" 
                  id="utmURL" 
                  {...registerUTMForm('utmURL', {
                    required: 'UTM URL is required',
                    pattern: {
                      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\w.-]*)*\/?(\\?.*utm_source=[\w%.-]+&utm_medium=[\w%.-]+(&[\w%.-]+=[\w%.-]+)*)?(#.*)?$/i,
                      message: 'Please enter a valid UTM URL',
                    },
                  })}
                /> 
                {errorsUTMForm.utmURL && <span className="error">{errorsUTMForm.utmURL.message}</span>}
                <span className="c-utm-field__text">The full UTM URL (e.g. https://www.example.com).</span>
              </div>
              <div className="c-utm-form__items">
                <button className='c-btn c-btn--utm' type="submit">Submit</button>
              </div>
            </form>
            <div className={`c-utm-validator__results ${!errorsUTMForm.utmURL && campaignSource && campaignMedium ? 'has-valid-url' : ''}`}>
              <div className="c-utm-validator__items">
                <div className="c-utm-validator__col">Name</div>
                <div className="c-utm-validator__col">Value</div>
              </div>
              <div className={`c-utm-validator__items ${generatedChannel === 'Other' ? 'is-invalid' : generatedChannel ? 'is-valid' : ''}`}>
                <div className="c-utm-validator__col">Default Channel</div>
                <div className="c-utm-validator__col">{generatedChannel ? generatedChannel === 'Other' ? 'Unassigned' : generatedChannel : '-'}</div>
              </div>
              <div className="c-utm-validator__items">
                <div className="c-utm-validator__col">Campaign ID</div>
                <div className="c-utm-validator__col">{campaignID ? campaignID : '-'}</div>
              </div>
              <div className="c-utm-validator__items">
                <div className="c-utm-validator__col">Campaign Source</div>
                <div className="c-utm-validator__col">{campaignSource ? campaignSource : '-'}</div>
              </div>
              <div className="c-utm-validator__items">
                <div className="c-utm-validator__col">Campaign Medium</div>
                <div className="c-utm-validator__col">{campaignMedium ? campaignMedium : '-'}</div>
              </div>
              <div className="c-utm-validator__items">
                <div className="c-utm-validator__col">Campaign Name</div>
                <div className="c-utm-validator__col">{campaignName ? campaignName : '-'}</div>
              </div>
              <div className="c-utm-validator__items">
                <div className="c-utm-validator__col">Campaign Term</div>
                <div className="c-utm-validator__col">{campaignTerm ? campaignTerm : '-'}</div>
              </div>
              <div className="c-utm-validator__items">
                <div className="c-utm-validator__col">Campaign Content</div>
                <div className="c-utm-validator__col">{campaignContent ? campaignContent : '-'}</div>
              </div>
            </div>            
          </div>
        </div>
      </div>    
    </ContainerBox>
  );
};

export default CampaignURLGenerator;
