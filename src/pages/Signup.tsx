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
  IonDatetime,
  IonCardTitle,
  IonChip
} from "@ionic/react";
import React from "react";
import axios from "axios";

export interface SignupProps {}

export interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: number;
}

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dob: 0
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleDOB = this.handleDOB.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    let data = new FormData();
    data.append("firstName", this.state.firstName);
    data.append("lastName", this.state.lastName);
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    data.append("dob", this.state.dob.toString());

    console.log("Submitted!");
    console.log(data);
    axios.post("http://127.0.0.1:5000/signup", data).then(res => {
      console.log(res.data);
    });
  }

  render() {
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
              <IonCardTitle>Sign-up for Foodster</IonCardTitle>

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
                <IonInput type="email" onIonInput={this.handleEmail}></IonInput>
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

export default Signup;
