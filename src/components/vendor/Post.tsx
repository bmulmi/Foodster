import {
  IonCardSubtitle,
  IonCard,
  IonText,
  IonCardHeader,
  IonCardTitle
} from "@ionic/react";
import React from "react";

const Post = ({ name = "", location = "", description = "" }) => (
  <IonCard button>
    <IonCardTitle color="primary">{name}</IonCardTitle>
    <IonCardSubtitle>{location}</IonCardSubtitle>
    <IonText color="medium">
      <p>{description}</p>
    </IonText>
  </IonCard>
);

export default Post;
