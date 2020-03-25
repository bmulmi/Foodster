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

export interface HomeProps {
  match: any;
}

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  user_id = this.props.match.params.id;

  render() {
    let new_post = "/newpost/" + this.user_id;
    let wall_url = "/vendorwall/" + this.user_id;
    let menu_url = "/vendormenu/" + this.user_id;

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
                {/* <Route
                  path="/vendorhome/:id"
                  render={() => <Redirect to={wall_url} />}
                  exact={true}
                /> */}
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
