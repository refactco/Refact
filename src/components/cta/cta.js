import React from "react";
import BaseComponent from "../base/base-component";
import ContainerBox from "../container-box/container-box";
import { PopupButton } from "react-calendly";

export default class CtaSection extends BaseComponent {
  render() {
    return (
      <ContainerBox className="c-section--cta">
        <div className="c-cta">
          <div className="c-cta__col">
            <h4 className="c-cta__title">
              Looking for a growth partner for media startup?
            </h4>
          </div>
          <div className="c-cta__col">
            <div className="c-cta__text">
              Get in touch and tell us about your project! We’d love to hear from you.
            </div>
            <PopupButton
              url="https://calendly.com/saeedreza/30min"
              /*
              * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
              * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
              */
              rootElement={document.getElementById("___gatsby")}
              text="Get in Touch"
              className='c-btn'
            />
          </div>
        </div>
      </ContainerBox>
    );
  }
}