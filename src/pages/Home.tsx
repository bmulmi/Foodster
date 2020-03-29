import {
  IonRouterOutlet,
  IonContent,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonTabs,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonPage,
  IonButton,
  IonButtons,
  IonGrid
} from "@ionic/react";
import { home, map, options, search } from "ionicons/icons";

import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import "./Home.css";
import Wall from "../components/user/Wall";
import Maps from "../components/user/Maps";
import Menu from "../components/user/Menu";
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

    let maps_url = "/maps/" + this.props.match.params.id;
    let wall_url = "/wall/" + this.props.match.params.id;
    let menu_url = "/menu/" + this.props.match.params.id;
    let search_url = "/search/" + this.props.match.params.id;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <p className="toolbar-font ion-padding-horizontal">
                    Foodster
                  </p>
                </IonCol>
                <IonCol size="2" className="ion-padding-top">
                  <IonButtons>
                    <IonButton
                      className="ion-margin-verticle"
                      color="primary"
                      fill="solid"
                      size="small"
                      shape="round"
                      routerLink={search_url}
                      routerDirection="forward"
                      onClick={() => console.log("clicked")}
                    >
                      <IonIcon slot="icon-only" icon={search} />
                    </IonButton>
                  </IonButtons>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet id="main">
                <Route path="/wall/:id" component={Wall} />
                <Route path="/maps/:id" component={Maps} />
                <Route path="/menu/:id" component={Menu} />

                <Route
                  path="/home/:id"
                  render={() => <Redirect to={wall_url} />}
                  exact={true}
                />
              </IonRouterOutlet>

              <IonTabBar slot="top">
                <IonTabButton tab="wall" href={wall_url}>
                  <IonIcon icon={home} />
                </IonTabButton>
                <IonTabButton tab="maps" href={maps_url}>
                  <IonIcon icon={map} />
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
