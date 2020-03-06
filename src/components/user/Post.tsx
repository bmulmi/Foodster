import {
  IonCardSubtitle,
  IonCard,
  IonGrid,
  IonText,
  IonRow,
  IonCol,
  IonAvatar,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel
} from "@ionic/react";
import React from "react";

const Post = ({
  id = "",
  name = "",
  location = "",
  description = "",
  post = { description: "", validFrom: "", validUntil: "" }
}) => (
  <IonCard>
    <IonItem lines="full">
      <IonAvatar>
        <img src="https://cdn1.iconfinder.com/data/icons/human-profession/1000/Chef_Food-2-512.png" />
      </IonAvatar>
      <IonLabel className="ion-padding-start">
        <IonCardTitle color="primary">{name}</IonCardTitle>
        <IonCardSubtitle>{location}</IonCardSubtitle>
      </IonLabel>
    </IonItem>
    <div className="regular-font ion-padding-horizontal ion-margin ion-text-center">
      <h2>{post.description}</h2>
      <IonCardSubtitle>
        Validity: {post.validFrom} - {post.validUntil}
      </IonCardSubtitle>
    </div>
  </IonCard>
);

export default Post;
