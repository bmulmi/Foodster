import {
  IonCardSubtitle,
  IonCard,
  IonCardTitle,
  IonItem,
  IonAvatar,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonIcon,
  IonItemOption
} from "@ionic/react";
import React from "react";
import { trash, closeCircle } from "ionicons/icons";
const Post = ({
  name = "",
  location = "",
  id = "",
  validFrom = "",
  validUntil = "",
  description = ""
}) => (
  <IonCard>
    <IonItemSliding>
      <IonItem lines="full">
        <IonAvatar>
          <img src="https://cdn1.iconfinder.com/data/icons/human-profession/1000/Chef_Food-2-512.png" />
        </IonAvatar>
        <IonLabel className="ion-padding-start">
          <IonCardTitle color="primary">{name}</IonCardTitle>
          <IonCardSubtitle>{location}</IonCardSubtitle>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger">Delete</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
    <div className="regular-font ion-padding-horizontal ion-margin ion-text-center">
      <h2>{description}</h2>
      <IonCardSubtitle>
        Validity: {validFrom} - {validUntil}
      </IonCardSubtitle>
    </div>
  </IonCard>
);

export default Post;
