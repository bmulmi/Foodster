import { IonContent, IonCard, IonText } from "@ionic/react";
import React from "react";

const Post = ({ name = "", location = "", description = "" }) => (
  <IonContent>
    <IonCard>
      <IonText color="primary">
        <h2>{name}</h2>
      </IonText>
      <IonText color="secondary">
        <p>{location}</p>
      </IonText>
      <IonText color="medium">
        <p>{description}</p>
      </IonText>
    </IonCard>
  </IonContent>
);

export default Post;
