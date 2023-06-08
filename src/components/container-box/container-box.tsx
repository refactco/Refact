import React, { ReactNode } from "react";
import BaseComponent from "../base/base-component";
import { IContainerProperties } from "./container-box-interface";

export default class ContainerBox extends BaseComponent<IContainerProperties> {
  public render(): ReactNode {
    const { className, id } = this.props;
    const consumedClassName: string = ["o-section", className].join(" ");

    return (
      <section className={consumedClassName} id={id}>
        <div className="o-section__wrapper">
          {this.props.children}
        </div>
      </section>
    );
  }
}
