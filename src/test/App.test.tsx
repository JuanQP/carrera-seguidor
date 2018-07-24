import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../components/App";
import { NullCarrera } from "../domain/null-carrera";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App carrera={new NullCarrera()}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
