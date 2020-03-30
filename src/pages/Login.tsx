import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonGrid,
  IonCol,
  IonText,
  IonFooter,
  IonSpinner
} from "@ionic/react";
import React from "react";
import axios from "axios";
import url from "../server_url";
import { Route, Redirect } from "react-router";
import { app } from "../base";

export interface LoginProps {
  match: any;
}

export interface LoginState {
  success: boolean;
  id: number;
  username: string;
  password: string;
  loginType: string;
  displayError: boolean;
  errorMsg: string;
  loading: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      success: false,
      id: 0,
      username: "",
      password: "",
      loginType: "",
      displayError: false,
      errorMsg: "",
      loading: false
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
  }

  componentDidMount() {
    let loginT = this.props.match.params.type;
    this.setState({ loginType: loginT });

    app.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("SIGNED IN: " + user.email);
      } else {
        console.log("No user is logged in");
      }
    });
  }

  handleUsername(event: any) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event: any) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event: any) {
    this.setState({ loading: true });
    event.preventDefault();
    app
      .auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(() => this.logUserIn())
      .catch(error => {
        console.log(error.message);
        this.setState({
          success: false,
          displayError: true,
          loading: false,
          errorMsg: error.message.toString()
        });
      });
  }

  logUserIn() {
    let data = new FormData();
    data.append("email", this.state.username);
    let uri = this.state.loginType == "user" ? "/login" : "/vendorlogin";

    axios.post(url + uri, data).then(res => {
      if (res.data === "failure") {
        this.setState({
          success: false,
          loading: false,
          displayError: true,
          errorMsg: "Invalid User: Please log in as Vendor"
        });
      } else {
        this.setState({ success: true, id: res.data, displayError: false });
      }
    });
  }

  render() {
    if (this.state.success) {
      let uri = this.state.loginType == "user" ? "/home/" : "/vendorhome/";
      return (
        <Route>
          <Redirect to={`${uri}${this.state.id}`} />
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
                <IonCol />
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
                  {this.state.loginType === "vendor" && (
                    <IonItem
                      lines="none"
                      className="subtitle-font ion-text-center ion-margin-vertical"
                    >
                      <IonLabel>Vendor Login</IonLabel>
                    </IonItem>
                  )}
                </IonCol>
              </IonRow>

              <IonRow>
                {this.state.displayError && (
                  <IonCol>
                    <IonItem lines="none" className="ion-text-center">
                      <IonText color="warning">{this.state.errorMsg}</IonText>
                    </IonItem>
                  </IonCol>
                )}
              </IonRow>
              <IonRow>
                <IonCol />{" "}
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
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
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      type="password"
                      onIonInput={this.handlePassword}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              {this.state.loading ? (
                <IonRow>
                  <IonCol size="4" />
                  <IonCol
                    size="4"
                    className="ion-text-center ion-padding-vertical ion-margin-vertical"
                  >
                    <IonSpinner name="circles" />{" "}
                  </IonCol>
                  <IonCol size="4" />
                </IonRow>
              ) : (
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
              )}
              <IonRow>
                <IonCol size="4" />
                <IonCol size="4" className="ion-text-center ion-padding">
                  <a href="/signup/user">Sign-up</a>
                </IonCol>
                <IonCol size="4" />
              </IonRow>
            </IonGrid>
          </IonContent>
          <IonFooter>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  {this.state.loginType !== "vendor" && (
                    <IonText className="ion-text-center">
                      <a href="/login/vendor">Vendor Login</a>
                    </IonText>
                  )}
                </IonCol>
                <IonCol size="4"></IonCol>
                <IonCol size="4">
                  <IonText className="ion-text-center">
                    <a href="/signup/vendor">Vendor Sign-up </a>
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
