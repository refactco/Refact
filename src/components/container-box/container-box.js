import React from "react";
import BaseComponent from "../base/base-component";

export default class ContainerBox extends BaseComponent {
  render() {
    const { className, id } = this.props;
    const consumedClassName = ["o-section", className].join(" ");

    return (
      <section className={consumedClassName} id={id}>
        <div className="o-section__wrapper">
          {this.props.children}
        </div>
      </section>
    );
  }
}
