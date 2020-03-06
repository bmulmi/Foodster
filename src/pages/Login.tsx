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
      .post(url + "/login", data)
      .then(res => {
        if (res.data === "failure") {
          this.setState({ success: false });
        } else {
          this.setState({ success: true, id: res.data });
        }
        // console.log(res.data);
      })
      .catch(res => {
        // console.log(res);
      });
  }

  render() {
    if (this.state.success) {
      return (
        <Route>
          <Redirect to={`/home/${this.state.id}`} />
        </Route>
      );
    } else {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <p className="toolbar-font ion-text-center">Foodster</p>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonGrid>
              <IonRow>
                <IonCol />{" "}
              </IonRow>
              <IonRow>
                <IonCol />{" "}
              </IonRow>
              <IonRow>
                <IonCol />{" "}
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonItem
                    lines="none"
                    className="title-font ion-text-center ion-margin-vertical"
                  >
                    <IonLabel>
                      <h1> Welcome to Foodster!</h1>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol />{" "}
              </IonRow>
              <IonRow>
                <IonCol />{" "}
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">username</IonLabel>
                    <IonInput
                      type="text"
                      onIonInput={this.handleUsername}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">password</IonLabel>
                    <IonInput
                      type="password"
                      onIonInput={this.handlePassword}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" />
                <IonCol
                  size="4"
                  className="ion-text-center ion-padding-vertical ion-margin-vertical"
                >
                  <IonButton onClick={this.handleSubmit}>Login</IonButton>
                </IonCol>
                <IonCol size="4" />
              </IonRow>
              <IonRow>
                <IonCol size="4" />
                <IonCol size="4" className="ion-text-center ion-padding">
                  <a href="/signup">Sign-up</a>
                </IonCol>
                <IonCol size="4" />
              </IonRow>
            </IonGrid>
          </IonContent>
          <IonFooter>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonText className="ion-text-center">
                    <a href="/vendorlogin">Vendor Login</a>
                  </IonText>
                </IonCol>
                <IonCol size="4"></IonCol>
                <IonCol size="4">
                  <IonText className="ion-text-center">
                    <a href="/vendorsignup">Vendor Sign-up </a>
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonFooter>
        </IonPage>
      );
    }
  }
}

export default Login;
