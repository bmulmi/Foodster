import React from "react";
import {
  IonPage,
  IonContent,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButtons
} from "@ionic/react";
import url from "../server_url";
export interface VendorPageProps {
  match: any;
}

export interface VendorPageState {}

class VendorPage extends React.Component<VendorPageProps, VendorPageState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(url);
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>
            This is a vendor page {this.props.match.params.vid},{" "}
            {this.props.match.params.uid}
          </p>
        </IonContent>
      </IonPage>
    );
  }
}

export default VendorPage;
