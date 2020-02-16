import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText
} from "@ionic/react";
import React from "react";
import { IonGrid, IonCol } from "@ionic/react";

export interface LoginProps {}

export interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    username: "bmulmi",
    password: "12345678"
  };

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
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol className="ion-align-self-end">
                <IonButton routerLink="/home">Login</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonItem>
            <IonText>
              <a href="/signup">Sign Up</a>
            </IonText>
          </IonItem>
        </IonContent>
      </IonPage>
    );
  }
}

export default Login;
