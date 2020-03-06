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
import url from "../../server_url";

export interface WallProps {
  match: any;
}

export interface WallState {
  data: any;
}

class Wall extends React.Component<WallProps, WallState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log("ID: ");
    console.log(this.props.match.params.id);
    axios.get(url + "/vendorwall/" + this.props.match.params.id).then(res => {
      console.log("Data recieved:" + res.data);
      this.setState({ data: res.data });
    });
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <Posts
            id={this.state.data.id}
            name={this.state.data.name}
            location={this.state.data.location}
            posts={this.state.data.posts}
          ></Posts>
        </IonContent>
      </IonPage>
    );
  }
}

export default Wall;
