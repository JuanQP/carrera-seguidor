import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import { NullCarrera } from "./domain/null-carrera";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <App carrera={new NullCarrera()}/>,
    document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
