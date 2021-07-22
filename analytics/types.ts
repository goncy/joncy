import ReactGA from "react-ga";

export interface Event extends ReactGA.EventArgs {
  currency?: string;
}
