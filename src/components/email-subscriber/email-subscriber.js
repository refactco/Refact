import axios from 'axios';
import React, { useState } from 'react';

const EmailSubscriber = () => {
  const [email, setEmail] = useState('');
  const [hideBox, setHideBox] = useState(false);
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  const subscribe = () => {
    setSubmitInProgress(true);

    const formId = '5682967';
    const apiKey = 'qRD0l7FwkaZtCWkgmvuxig';

    axios
      .post(
        `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
        {
          api_key: apiKey,
          email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            charset: 'utf-8',
          },
        }
      )
      .then(() => {
        setSuccessfulSubmit(true);

        setTimeout(() => {
          setHideBox(true);
        }, 5000);
      })
      .catch(() => {
        setErrorSubmit(true);
      })
      .finally(() => {
        setSubmitInProgress(false);
      });
  };

  if (hideBox) {
    return null;
  }

  return (
    <div className="c-email-subscriber">
      {successfulSubmit ? (
        <p className="c-email-subscriber__success-message">
          Thanks for subscribing. You've received an email
        </p>
      ) : (
        <>
          <div>
            <h4>Enjoying this post?</h4>
            <p>Subscribe and receive more along with updates from us.</p>
          </div>
          <div>
            <input
              value={email}
              placeholder="Enter email address"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <button
              className="c-btn"
              disabled={submitInProgress}
              onClick={() => {
                subscribe();
              }}
            >
              {submitInProgress ? 'Progressing...' : 'Subscribe'}
            </button>
          </div>
          {errorSubmit ? (
            <p>An error occurred in subscription submitting</p>
          ) : null}
        </>
      )}
    </div>
  );
};

export default EmailSubscriber;
