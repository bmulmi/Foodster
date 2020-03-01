import {
  IonCardSubtitle,
  IonCard,
  IonText,
  IonCardHeader,
  IonCardTitle
} from "@ionic/react";
import React from "react";

const Post = ({
  id = "",
  name = "",
  location = "",
  description = "",
  post = { description: "", validFrom: "", validUntil: "" }
}) => (
  <IonCard button>
    <IonCardTitle color="primary">{name}</IonCardTitle>
    <IonCardSubtitle>{location}</IonCardSubtitle>
    <IonCardSubtitle>
      {description}
      <br />
      Oid: {id}
    </IonCardSubtitle>
    <IonText color="medium">
      <p>
        {post.validFrom} - {post.validUntil}
      </p>
      <p>{post.description}</p>
    </IonText>
  </IonCard>
);

export default Post;
