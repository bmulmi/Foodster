import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonDatetime,
  IonButton,
  IonTextarea,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonToast
} from "@ionic/react";
import React from "react";
import axios from "axios";
import url from "../../server_url";

export interface MakePostProps {
  match: any;
}

export interface MakePostState {
  description: string;
  validFrom: number;
  validUntil: number;
  timeStamp: string;
  status: boolean;
}

class MakePost extends React.Component<MakePostProps, MakePostState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: "",
      validFrom: 0,
      validUntil: 0,
      timeStamp: "",
      status: false
    };
    this.handleDescription = this.handleDescription.bind(this);
    this.handleValidFrom = this.handleValidFrom.bind(this);
    this.handleValidUntil = this.handleValidUntil.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  user_id = this.props.match.params.id;

  handleDescription(event: any) {
    this.setState({ description: event.target.value });
  }

  handleValidFrom(event: any) {
    this.setState({ validFrom: event.target.value.split("T")[0] });
  }

  handleValidUntil(event: any) {
    this.setState({ validUntil: event.target.value.split("T")[0] });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    let date = new Date();
    this.setState({ timeStamp: date.toISOString() });

    let data = new FormData();
    data.append("description", this.state.description);
    data.append("validFrom", this.state.validFrom.toString());
    data.append("validUntil", this.state.validUntil.toString());
    data.append("timeStamp", date.toISOString().split(".")[0]);
    console.log(data);

    axios.post(url + "/vendorpost/" + this.user_id, data).then(res => {
      if (res.data === "failure") {
        //make toast about failure and reload page
        this.setState({ status: false });
      } else {
        //make toast about success and reload page
        this.setState({ status: true });
      }
    });
  }
  render() {
    return (
      <IonPage>
        <IonContent>
          <IonCard>
            <IonCardContent>
              <IonCardTitle className="title-font ion-text-center ion-margin-vertical">
                Create Post
              </IonCardTitle>
              <IonItem>
                <IonLabel position="floating">Whats it about?</IonLabel>
                <IonTextarea
                  rows={4}
                  onIonInput={this.handleDescription}
                ></IonTextarea>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Valid From</IonLabel>
                <IonDatetime
                  displayFormat="MM-DD-YYYY"
                  placeholder="MM-DD-YYYY"
                  onIonChange={this.handleValidFrom}
                ></IonDatetime>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Valid Until</IonLabel>
                <IonDatetime
                  displayFormat="MM-DD-YYYY"
                  placeholder="MM-DD-YYYY"
                  onIonChange={this.handleValidUntil}
                ></IonDatetime>
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonGrid>
            <IonRow>
              <IonCol size="4" />
              <IonCol
                size="4"
                className="ion-text-center ion-padding-vertical "
              >
                <IonButton onClick={this.handleSubmit}>Post</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonToast
            isOpen={this.state.status}
            message="Posted"
            position="bottom"
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default MakePost;
