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
  IonText
} from "@ionic/react";
import React from "react";
import axios from "axios";
import Home from "./Home";
import { number } from "prop-types";
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
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    axios
      .post("http://127.0.0.1:5000/login", data)
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
      let url_id = "/home/" + this.state.id;
      return (
        <Route>
          <Redirect to={url_id}></Redirect>
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
}

export default Login;
