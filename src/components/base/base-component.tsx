import { Component } from "react";
import "normalize.css";
import '../../assets/styles/main.scss';


export default abstract class BaseComponent<
  P = {},
  S = {},
  SS = any
> extends Component<P, S, SS> {


}
