import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage
} from "@ionic/react";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { home, map, restaurant } from "ionicons/icons";
import "../user/Menu.css";

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
    title: "posts",
    url: "/vendorwall/",
    iosIcon: home
  },
  {
    title: "newpost",
    url: "/newpost/",
    iosIcon: map
  },
  {
    title: "settings",
    url: "/",
    iosIcon: restaurant
  }
];

const Menu: React.FC<MenuProps> = ({ user_id }) => {
  console.log("from Maps " + user_id);
  return (
    <IonPage>
      <IonContent>
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonItem routerLink={appPage.url + user_id}>
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
