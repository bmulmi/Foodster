import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonListHeader
} from "@ionic/react";
import { app } from "../../base";
import React from "react";
import {
  logOut,
  person,
  bookmark,
  location,
  helpBuoy,
  book,
  alertCircle,
  chatbox,
  settings,
  language,
  lockClosed
} from "ionicons/icons";
import "./Menu.css";
import { Redirect } from "react-router";
interface AppPage {
  url: string;
  iosIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Profile",
    url: "/construction/",
    iosIcon: person
  },
  {
    title: "Saved",
    url: "/construction/",
    iosIcon: bookmark
  },
  {
    title: "Events",
    url: "/construction/",
    iosIcon: location
  }
];

const helpPages: AppPage[] = [
  {
    title: "Help Center",
    url: "/construction/",
    iosIcon: helpBuoy
  },
  {
    title: "Help Community",
    url: "/construction/",
    iosIcon: chatbox
  },
  {
    title: "Report a Problem",
    url: "/construction/",
    iosIcon: alertCircle
  },
  {
    title: "Terms & Policies",
    url: "/construction/",
    iosIcon: book
  }
];

const settingsPages: AppPage[] = [
  {
    title: "Settings",
    url: "/construction/",
    iosIcon: settings
  },
  {
    title: "Language",
    url: "/construction/",
    iosIcon: language
  },
  {
    title: "Privacy Shortcuts",
    url: "/construction/",
    iosIcon: lockClosed
  }
];

export interface MenuProps {
  match: any;
}

export interface MenuState {
  redirect: boolean;
}

class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: any) {
    super(props);
    this.state = { redirect: false };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    app
      .auth()
      .signOut()
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(err => console.log(err.message));
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <IonPage>
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>General</IonListHeader>
            {appPages.map((appPage, index) => {
              return (
                <IonItem
                  key={index}
                  href={appPage.url + this.props.match.params.id}
                  routerDirection="forward"
                >
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              );
            })}
          </IonList>
          <IonList id="inbox-list">
            <IonListHeader>Help & Support</IonListHeader>
            {helpPages.map((appPage, index) => {
              return (
                <IonItem
                  key={index}
                  href={appPage.url + this.props.match.params.id}
                  routerDirection="forward"
                >
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              );
            })}
          </IonList>

          <IonList id="inbox-list">
            <IonListHeader>Settings & Privacy</IonListHeader>
            {settingsPages.map((appPage, index) => {
              return (
                <IonItem
                  key={index}
                  href={appPage.url + this.props.match.params.id}
                  routerDirection="forward"
                >
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              );
            })}
            <IonItem button onClick={this.handleLogout}>
              <IonIcon slot="start" icon={logOut} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default Menu;
