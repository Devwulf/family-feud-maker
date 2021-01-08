import React from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import "./App.css";
import "./assets/main.css";
import Home from "./pages/Home";
import Make from "./pages/Make";
import Play from "./pages/Play";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import EditQuestionSet from "./pages/EditQuestionSet";

library.add(fas);

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/play" component={Play} />
                <Route exact path="/make" component={Make} />
                <Route exact path="/make/:id" component={EditQuestionSetComponent} />
            </Switch>
        </BrowserRouter>
    );
}

function EditQuestionSetComponent() {
    const { id } = useParams();

    return (
        <EditQuestionSet id={id} />
    );
}

export default App;
