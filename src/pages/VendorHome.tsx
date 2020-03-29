import {
  IonRouterOutlet,
  IonContent,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonTabs,
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle
} from "@ionic/react";
import { search, newspaper, list, options } from "ionicons/icons";

import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import "./Home.css";
import Wall from "../components/vendor/Wall";
import MakePost from "../components/vendor/MakePost";
import Menu from "../components/vendor/Menu";
import { app } from "../base";

export interface HomeProps {
  match: any;
}

export interface HomeState {
  authenticated: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      authenticated: true
    };
  }

  componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("SIGNED IN: " + user.email);
        this.setState({
          authenticated: true
        });
      } else {
        console.log("SIGNED OUT");
        this.setState({
          authenticated: false
        });
      }
    });
  }

  render() {
    if (this.state.authenticated === false) {
      return <Redirect to="/" />;
    }

    let new_post = "/newpost/" + this.props.match.params.id;
    let wall_url = "/vendorwall/" + this.props.match.params.id;
    let menu_url = "/vendormenu/" + this.props.match.params.id;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <p className="toolbar-font ion-padding ion-margin">Foodster</p>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet id="main">
                <Route path="/vendorwall/:id" component={Wall} />
                <Route path="/newpost/:id" component={MakePost} />
                <Route path="/vendormenu/:id" component={Menu} />
                <Route
                  path="/vendorhome/:id"
                  render={() => <Redirect to={wall_url} />}
                  exact={true}
                />
              </IonRouterOutlet>

              <IonTabBar slot="top">
                <IonTabButton tab="wall" href={wall_url}>
                  <IonIcon icon={list} />
                </IonTabButton>
                <IonTabButton tab="newpost" href={new_post}>
                  <IonIcon icon={newspaper} />
                </IonTabButton>
                <IonTabButton tab="menu" href={menu_url}>
                  <IonIcon icon={options} />
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
