import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonListHeader
} from "@ionic/react";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { home, map, restaurant } from "ionicons/icons";
import "./Menu.css";

interface MenuProps extends RouteComponentProps {
  user_id: string;
}

interface AppPage {
  url: string;
  iosIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Profile",
    url: "/profile/",
    iosIcon: home
  },
  {
    title: "Saved",
    url: "/saved/",
    iosIcon: map
  },
  {
    title: "Groups",
    url: "/allvendors/",
    iosIcon: restaurant
  },
  {
    title: "Events",
    url: "/events/",
    iosIcon: restaurant
  }
];

const helpPages: AppPage[] = [
  {
    title: "Help Center",
    url: "/construction/",
    iosIcon: home
  },
  {
    title: "Help Community",
    url: "/construction/",
    iosIcon: map
  },
  {
    title: "Report a Problem",
    url: "/construction/",
    iosIcon: restaurant
  },
  {
    title: "Terms & Policies",
    url: "/construction/",
    iosIcon: restaurant
  }
];

const settingsPages: AppPage[] = [
  {
    title: "Settings",
    url: "/construction/",
    iosIcon: home
  },
  {
    title: "Language",
    url: "/construction/",
    iosIcon: map
  },
  {
    title: "Privacy Shortcuts",
    url: "/construction/",
    iosIcon: restaurant
  }
];

const Menu: React.FC<MenuProps> = ({ user_id }) => {
  console.log("from Menu " + user_id);
  return (
    <IonPage>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>General</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonItem key={index} routerLink={appPage.url + user_id}>
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
              <IonItem key={index} routerLink={appPage.url + user_id}>
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
              <IonItem key={index} routerLink={appPage.url + user_id}>
                <IonIcon slot="start" icon={appPage.iosIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Menu);
