import { IonItem, IonLabel } from "@ionic/react";
import React from "react";

export function handleClick(event: any) {
  console.log(event.target.value);
}

const Item = ({ userId = "", vendorId = "", name = "" }) => (
  <IonItem
    routerLink={`/vendorpage/${vendorId}/${userId}`}
    routerDirection="forward"
  >
    <IonLabel>{name}</IonLabel>
  </IonItem>
);

export default Item;
