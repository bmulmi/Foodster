import {
  IonItem,
  IonCard,
  IonText,
  IonCardHeader,
  IonCardTitle
} from "@ionic/react";
import React from "react";

export function handleClick(event: any) {
  console.log(event.target.value);
}

const Item = ({ userId = "", vendorId = "", name = "" }) => (
  <IonItem
    routerLink={`/vendorpage/${vendorId}/${userId}`}
    routerDirection="forward"
  >
    {name}
  </IonItem>
);

export default Item;
