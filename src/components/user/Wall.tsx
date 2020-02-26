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
  user_id: string;
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

  user_id = this.props.match.params.id;

  componentDidMount() {
    console.log("ID: ");
    console.log(this.props.user_id);
    axios.get("http://127.0.0.1:5000/home/" + this.props.user_id).then(res => {
      console.log("Data recieved:" + res.data);
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
