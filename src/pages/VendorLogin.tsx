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
  IonGrid,
  IonCol,
  IonText,
  IonFooter
} from "@ionic/react";
import React from "react";
import axios from "axios";
import url from "../server_url";
import { Route, Redirect } from "react-router";
export interface LoginProps {}

export interface LoginState {
  success: boolean;
  id: number;
  username: string;
  password: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      success: false,
      id: 0,
      username: "",
      password: ""
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(event: any) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event: any) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    let data = new FormData();
    data.append("email", this.state.username);
    data.append("password", this.state.password);
    axios
      .post(url + "/vendorlogin", data)
      .then(res => {
        if (res.data === "failure") {
          this.setState({ success: false });
        } else {
          this.setState({ success: true, id: res.data });
        }
        console.log(res.data);
      })
      .catch(res => {
        console.log(res);
      });
  }

  render() {
    if (this.state.success) {
      return (
        <Route>
          <Redirect to={`/vendorhome/${this.state.id}`} />
        </Route>
      );
    } else {
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
              <IonInput type="text" onIonInput={this.handleUsername}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">password</IonLabel>
              <IonInput
                type="password"
                onIonInput={this.handlePassword}
              ></IonInput>
            </IonItem>
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol className="ion-align-self-end">
                  <IonButton onClick={this.handleSubmit}>Login</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
          <IonFooter>
            <IonItem>
              <IonText>Vendor page</IonText>
            </IonItem>
          </IonFooter>
        </IonPage>
      );
    }
  }
}

export default Login;
