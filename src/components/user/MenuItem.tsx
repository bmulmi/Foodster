import { IonItem, IonLabel, IonIcon } from "@ionic/react";
import React from "react";
export function handleClick(event: any) {
  console.log(event.target.value);
}

const MItem = ({ url = "", uid = "", name = "", iName = "" }) => (
  <IonItem routerLink={`${url}${uid}`} routerDirection="forward">
    <IonIcon slot="start" icon={iName} />
    <IonLabel>{name}</IonLabel>
  </IonItem>
);

export default MItem;
