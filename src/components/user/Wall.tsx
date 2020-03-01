import {
  IonContent,
  IonPage,
  IonRouterOutlet,
  IonButtons,
  IonMenuButton
} from "@ionic/react";
import React from "react";
import axios from "axios";
import Posts from "./Posts";

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
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/home/" + this.props.match.params.id)
      .then(res => {
        // console.log("Data recieved:" + res.data);
        this.setState({ posts: res.data });
      });
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <Posts data={this.state.posts}></Posts>
        </IonContent>
      </IonPage>
    );
  }
}

export default Wall;
