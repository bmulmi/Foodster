import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import React from "react";
import axios from "axios";
import Posts from "./Posts";
import url from "../../server_url";

export interface WallProps {
  match: any;
}

export interface WallState {
  posts: [];
}

class Wall extends React.Component<WallProps, WallState> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: []
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    axios.get(url + "/home/" + this.props.match.params.id).then(res => {
      // console.log("Data recieved:" + res.data);
      this.setState({ posts: res.data });
    });
  }

  refresh(event: CustomEvent<RefresherEventDetail>) {
    axios.get(url + "/home/" + this.props.match.params.id).then(res => {
      this.setState({ posts: res.data });
      event.detail.complete();
    });
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={this.refresh}>
            <IonRefresherContent refreshingSpinner="circles" />
          </IonRefresher>
          <Posts data={this.state.posts}></Posts>
        </IonContent>
      </IonPage>
    );
  }
}

export default Wall;
