import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";

const Maps: React.FC<RouteComponentProps<{ user_id: string }>> = ({}) => {
  return (
    <IonPage>
      <IonContent>
        <IonTitle size="large">Map Coming Soon...</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default Maps;
