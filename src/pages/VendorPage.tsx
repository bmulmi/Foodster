import React from "react";
import {
  IonPage,
  IonContent,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonItem,
  IonButton,
  IonLabel,
  IonImg,
  IonItemGroup,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCardSubtitle,
  IonItemDivider
} from "@ionic/react";
import { close, checkmark } from "ionicons/icons";
import { Redirect } from "react-router-dom";

import url from "../server_url";
import axios from "axios";
import Posts from "../components/vendor/Posts";
import { app } from "../base";

export interface VendorPageProps {
  match: any;
}

export interface VendorPageState {
  vendorData: any;
  userData: any;
  authenticated: boolean;
  isFollowing: boolean;
}

class VendorPage extends React.Component<VendorPageProps, VendorPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      vendorData: [],
      userData: [],
      isFollowing: false,
      authenticated: true
    };
    this.handleFollowClick = this.handleFollowClick.bind(this);
  }

  componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true
        });
      } else {
        this.setState({
          authenticated: false
        });
      }
    });
  }

  componentDidMount() {
    axios.get(url + "/vendorinfo/" + this.props.match.params.vid).then(res => {
      if (res.data === "failure") {
        console.log("Failed");
      } else {
        this.setState({ vendorData: res.data });
      }
    });

    axios.get(url + "/userinfo/" + this.props.match.params.uid).then(res => {
      if (res.data === "failure") {
        console.log("Failed");
      } else {
        this.setState({ userData: res.data });
        let following = res.data.following;
        let vid = this.state.vendorData.id;
        if (following.includes(vid)) {
          this.setState({ isFollowing: true });
        } else {
          this.setState({ isFollowing: false });
        }
      }
    });
  }

  handleFollowClick(event: any) {
    let uid = this.props.match.params.uid;
    let vid = this.props.match.params.vid;
    if (this.state.isFollowing) {
      this.setState({ isFollowing: false });
      axios.post(url + "/unfollow/" + uid + "/" + vid).then(res => {
        // console.log(res.data);
        this.setState({ userData: res.data });
      });
    } else {
      this.setState({ isFollowing: true });
      axios.post(url + "/follow/" + uid + "/" + vid).then(res => {
        // console.log(res.data);
        this.setState({ userData: res.data });
      });
      this.forceUpdate();
    }
  }
  render() {
    if (this.state.authenticated === false) {
      return <Redirect to="/" />;
    }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref={`/home/${this.props.match.params.uid}`}
              />
            </IonButtons>
            <IonTitle>{this.state.vendorData.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonImg src="https://i.pinimg.com/736x/20/27/0f/20270fdb19d0c0925c3d0ca3cb6280c8.jpg" />
          <IonItemGroup>
            <div className="ion-text-center ion-margin-top">
              <h1 className="title-font">{this.state.vendorData.name}</h1>
              <IonCardSubtitle>
                {this.state.vendorData.location}
              </IonCardSubtitle>
            </div>
            <IonItem lines="none">
              <IonLabel className="ion-text-center subtitle-font">
                {this.state.vendorData.description}
              </IonLabel>
            </IonItem>
            <IonItem lines="full" className="ion-text-center">
              <IonGrid>
                <IonRow>
                  <IonCol size="4" />
                  <IonCol size="4">
                    <IonButtons>
                      {this.state.isFollowing ? (
                        <IonButton
                          color="dark"
                          fill="solid"
                          size="default"
                          shape="round"
                          onClick={this.handleFollowClick}
                        >
                          <IonIcon icon={close} />
                          Unfollow
                        </IonButton>
                      ) : (
                        <IonButton
                          color="primary"
                          fill="solid"
                          size="default"
                          shape="round"
                          onClick={this.handleFollowClick}
                        >
                          <IonIcon icon={checkmark} />
                          Follow
                        </IonButton>
                      )}
                    </IonButtons>
                  </IonCol>
                  <IonCol size="4" />
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonItemGroup>
          <IonItemDivider sticky>
            <IonItem lines="full">
              <IonLabel>Posts</IonLabel>
            </IonItem>
          </IonItemDivider>
          {console.log(this.state.vendorData)}
          <Posts
            id={this.state.vendorData.id}
            name={this.state.vendorData.name}
            location={this.state.vendorData.location}
            posts={this.state.vendorData.posts}
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default VendorPage;
