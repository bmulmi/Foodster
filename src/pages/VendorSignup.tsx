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
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonChip
} from "@ionic/react";
import React from "react";
import axios from "axios";
import { Route, Redirect } from "react-router";

export interface VendorsignupProps {}

export interface VendorsignupState {
  name: string;
  location: string;
  latitude: string;
  longitude: string;
  email: string;
  password: string;
  description: string;
  success: boolean;
  id: number;
}

class Vendorsignup extends React.Component<
  VendorsignupProps,
  VendorsignupState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      location: "",
      latitude: "0",
      longitude: "0",
      email: "",
      password: "",
      description: "",
      success: false,
      id: 0
    };
    this.handleName = this.handleName.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event: any) {
    this.setState({ name: event.target.value });
  }

  handleLocation(event: any) {
    this.setState({ location: event.target.value });
  }

  handleEmail(event: any) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event: any) {
    this.setState({ password: event.target.value });
  }

  handleDescription(event: any) {
    this.setState({ description: event.target.value });
  }
  handleSubmit(event: any) {
    event.preventDefault();
    let data = new FormData();
    data.append("firstName", this.state.name);
    data.append("location", this.state.location);
    data.append("latitude", this.state.latitude);
    data.append("longitude", this.state.longitude);
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    data.append("description", this.state.description);

    console.log(data);
    axios.post("http://127.0.0.1:5000/vendorsignup", data).then(res => {
      if (res.data === "failure") {
        this.setState({ success: false });
        console.log(res.data);
      } else {
        this.setState({ success: true, id: res.data });
      }
      console.log(res.data);
    });
  }

  render() {
    if (this.state.success) {
      let url_id = "/vendorhome/" + this.state.id;
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
          <IonContent>
            <IonCard>
              <IonCardContent className="ion-padding">
                <IonCardTitle>Restaurant Sign-up</IonCardTitle>

                <IonItem>
                  <IonLabel position="floating">Name</IonLabel>
                  <IonInput type="text" onIonInput={this.handleName}></IonInput>
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
                  <IonChip>
                    <IonLabel>Upload a Profile Picture</IonLabel>
                  </IonChip>
                </IonItem>
              </IonCardContent>

              <IonItem>
                <IonButton onClick={this.handleSubmit}>Sign-up</IonButton>
              </IonItem>
            </IonCard>
          </IonContent>
        </IonPage>
      );
    }
  }
}

export default Vendorsignup;
