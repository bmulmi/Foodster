import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Search from "./components/user/Search";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Vendorlogin from "./pages/VendorLogin";
import Vendorsignup from "./pages/VendorSignup";
import Vendorhome from "./pages/VendorHome";
import Vendorpage from "./pages/VendorPage";
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

/* Global CSS */
import "./global.css";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          {/* <Route path="/wall/" component={Wall} />
          <Route path="/maps/" component={Maps} /> */}
          <Route path="/home/:id" component={Home} />
          <Route path="/search/:id" component={Search} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/signup" component={Signup} />
          <Route path="/vendorsignup" component={Vendorsignup} />
          <Route path="/vendorlogin" component={Vendorlogin} />
          <Route path="/vendorhome/:id" component={Vendorhome} />
          <Route path="/vendorpage/:vid/:uid" component={Vendorpage} />

          <Route exact path="/" render={() => <Redirect to="/login" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
