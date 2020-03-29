import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonText,
  IonCardContent,
  IonDatetime,
  IonCardTitle,
  IonChip,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";
import React from "react";
import axios from "axios";
import url from "../server_url";
import mapboxgl from "mapbox-gl";
import { app } from "../base";

import { Route, Redirect } from "react-router";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYm11bG1pIiwiYSI6ImNrN2t3YTRkbjAxZG0zZXJyaWsyeG0ycnoifQ.B8842nJdR1uhz0lirF_WYQ";

export interface SignupProps {
  match: any;
}

export interface SignupState {
  firstName: string;
  lastName: string;
  name: string;
  location: string;
  latitude: string;
  longitude: string;
  email: string;
  password: string;
  dob: number;
  description: string;
  success: boolean;
  id: number;
  stype: string;
  displayError: boolean;
  errorMsg: string;
}

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      name: "",
      location: "",
      latitude: "0",
      longitude: "0",
      email: "",
      password: "",
      dob: 0,
      description: "",

      success: false,
      id: 0,
      stype: "",

      displayError: false,
      errorMsg: ""
    };
    this.handleName = this.handleName.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleDOB = this.handleDOB.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
  }

  componentDidMount() {
    this.setState({ stype: this.props.match.params.type });
  }

  handleLocation(event: any) {
    let loc = event.target.value;
    var uri =
      "https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(loc) +
      ".json" +
      "?access_token=" +
      mapboxgl.accessToken;

    axios.get(uri).then(res =>
      this.setState({
        longitude: res.data.features[0].center[0].toString(),
        latitude: res.data.features[0].center[1].toString(),
        location: loc
      })
    );
  }

  handleDescription(event: any) {
    this.setState({ description: event.target.value });
  }
  handleName(event: any) {
    this.setState({ name: event.target.value });
  }
  handleFirstName(event: any) {
    this.setState({ firstName: event.target.value });
  }

  handleLastName(event: any) {
    this.setState({ lastName: event.target.value });
  }

  handleEmail(event: any) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event: any) {
    this.setState({ password: event.target.value });
  }

  handleDOB(event: any) {
    this.setState({ dob: event.target.value.split("T")[0] });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    app
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password);
    app
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.logUserIn())
      .catch(error => {
        console.log(error.message);
        this.setState({
          success: false,
          displayError: true,
          errorMsg: error.message.toString()
        });
      });
  }

  logUserIn() {
    let data = new FormData();

    if (this.state.stype == "vendor") {
      data.append("name", this.state.name);
      data.append("location", this.state.location);
      data.append("latitude", this.state.latitude);
      data.append("longitude", this.state.longitude);
      data.append("email", this.state.email);
      // data.append("password", this.state.password);
      data.append("description", this.state.description);
    } else {
      data.append("firstName", this.state.firstName);
      data.append("lastName", this.state.lastName);
      data.append("email", this.state.email);
      // data.append("password", this.state.password);
      data.append("dob", this.state.dob.toString());
    }
    // console.log(data);

    let uri = this.state.stype == "user" ? "/signup" : "/vendorsignup";
    axios.post(url + uri, data).then(res => {
      this.setState({ success: true, id: res.data });
    });
  }
  render() {
    if (this.state.success) {
      let url_id =
        this.state.stype == "user"
          ? "/home/" + this.state.id
          : "/vendorhome/" + this.state.id;
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
              <p className="toolbar-font ion-text-center">Foodster</p>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {this.state.stype == "user" ? (
              // -------------------- User Sign up --------------------

              <IonCard>
                <IonCardContent className="ion-padding">
                  <IonCardTitle className="title-font ion-text-center ion-margin-vertical">
                    User Sign-up
                  </IonCardTitle>

                  <IonItem>
                    <IonLabel position="floating">First Name</IonLabel>
                    <IonInput
                      type="text"
                      onIonInput={this.handleFirstName}
                    ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating">Last Name</IonLabel>
                    <IonInput
                      type="text"
                      onIonInput={this.handleLastName}
                    ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating">E-mail</IonLabel>
                    <IonInput
                      type="email"
                      onIonInput={this.handleEmail}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      type="password"
                      onIonInput={this.handlePassword}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Birth Date</IonLabel>
                    <IonDatetime
                      displayFormat="MM-DD-YYYY"
                      placeholder="MM-DD-YYYY"
                      onIonChange={this.handleDOB}
                    ></IonDatetime>
                  </IonItem>
                  <IonItem>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="2" />
                        <IonCol size="4">
                          <IonChip>
                            <IonLabel>Upload a Profile Picture</IonLabel>
                          </IonChip>
                        </IonCol>
                        <IonCol size="4" />
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ) : (
              // -------------------- Vendor Sign up --------------------
              <IonCard>
                <IonCardContent className="ion-padding">
                  <IonCardTitle className="title-font ion-text-center ion-margin-vertical">
                    Vendor Sign-up
                  </IonCardTitle>

                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      type="text"
                      onIonInput={this.handleName}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Location</IonLabel>
                    <IonInput
                      type="text"
                      onIonInput={this.handleLocation}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">E-mail</IonLabel>
                    <IonInput
                      type="email"
                      onIonInput={this.handleEmail}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      type="password"
                      onIonInput={this.handlePassword}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Description</IonLabel>
                    <IonInput
                      type="text"
                      onIonInput={this.handleDescription}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="2" />
                        <IonCol size="4">
                          <IonChip>
                            <IonLabel>Upload a Profile Picture</IonLabel>
                          </IonChip>
                        </IonCol>
                        <IonCol size="4" />
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            )}

            <IonGrid>
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
                <IonCol size="4" />
                <IonCol
                  size="4"
                  className="ion-text-center ion-padding-vertical ion-margin-vertical"
                >
                  <IonButton onClick={this.handleSubmit}>Sign-up</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      );
    }
  }
}

export default Signup;
