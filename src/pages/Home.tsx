import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React from "react";
import "./Home.css";
import Posts from "../components/Posts";
import axios from "axios";

export interface HomeProps {
  match: any;
}

export interface HomeState {
  posts: [];
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: []
    };
  }

  user_id = this.props.match.params.id;

  componentDidMount() {
    console.log("ID: ");
    console.log(this.user_id);
    axios.get("http://127.0.0.1:5000/home/" + this.user_id).then(res => {
      console.log("Data recieved:" + res.data);
      this.setState({ posts: res.data });
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
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Foodster</IonTitle>
            </IonToolbar>
          </IonHeader>
          <Posts data={this.state.posts}></Posts>
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
