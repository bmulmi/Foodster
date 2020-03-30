import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Search from "./components/user/Search";
import Wall from "./components/user/Wall";
import Maps from "./components/user/Maps";
import Menu from "./components/user/Menu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Vendorhome from "./pages/VendorHome";
import Vendorpage from "./pages/VendorPage";
import EContainer from "./components/ExploreContainer";

import { app } from "./base";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/fonts.css";

/* Global CSS */
// import "./global.css";
export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route path="/login/:type" component={Login} exact={true} />
            <Route path="/signup/:type" component={Signup} />
            <Route path="/home/:id" component={Home} />
            <Route path="/vendorhome/:id" component={Vendorhome} />
            <Route path="/search/:id" component={Search} />
            <Route path="/construction/:id" component={EContainer} />
            <Route path="/vendorpage/:vid/:uid" component={Vendorpage} />

            <Route
              exact
              path="/"
              render={() => <Redirect to="/login/user" />}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }
}

export default App;
