import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFabButton,
  IonInput,
  IonItem,
  IonLabel
} from "@ionic/react";
import React from "react";

export interface SignupProps {}

export interface SignupState {}

class Signup extends React.Component<SignupProps, SignupState> {
  state = {};
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Foodster</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          Welcome to Foodster!
          <IonItem>
            <IonLabel position="floating">username</IonLabel>
            <IonInput type="text"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">password</IonLabel>
            <IonInput type="password"></IonInput>
          </IonItem>
          <IonFabButton routerLink="/home">Login</IonFabButton>
        </IonContent>
      </IonPage>
    );
  }
}

export default Signup;
