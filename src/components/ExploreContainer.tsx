import React from "react";
import "./ExploreContainer.css";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import url from "../server_url";

export interface EContainerProps {
  match: any;
}

export interface EContainerState {}

class EContainer extends React.Component<EContainerProps, EContainerState> {
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonGrid>
              <IonRow>
                <IonCol size="2">
                  <IonButtons>
                    <IonBackButton
                      defaultHref={`/home/${this.props.match.params.id}`}
                    />
                  </IonButtons>
                </IonCol>
                <IonCol>
                  <p className="toolbar-font ion-padding-horizontal">
                    Foodster
                  </p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="container">
            <strong>Page under construction</strong>
            <p>Please come back later</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default EContainer;
