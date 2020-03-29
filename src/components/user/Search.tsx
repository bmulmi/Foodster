import React from "react";
import axios from "axios";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonSearchbar,
  IonContent,
  IonList
} from "@ionic/react";
import SearchItem from "./SearchItem";
import url from "../../server_url";
import { app } from "../../base";
import { Redirect } from "react-router-dom";

export interface SearchProps {
  match: any;
}

export interface SearchState {
  vendorList: any;
  constantList: any;
  authenticated: boolean;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      vendorList: [],
      constantList: [],
      authenticated: true
    };
    this.handleInput = this.handleInput.bind(this);
    this.resetValues = this.resetValues.bind(this);
  }

  componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("SIGNED IN: " + user.email);
        this.setState({
          authenticated: true
        });
      } else {
        console.log("SIGNED OUT");
        this.setState({
          authenticated: false
        });
      }
    });
  }

  componentDidMount() {
    axios.get(url + "/search").then(res => {
      console.log("Data recieved:" + res.data);
      this.setState({ vendorList: res.data, constantList: res.data });
    });
  }

  handleInput(event: any) {
    let currentList = [];
    let newList = [];

    if (event.target.value !== "") {
      currentList = this.state.vendorList;

      newList = currentList.filter((item: any) => {
        const filtered = item["name"].toLowerCase();
        const filter = event.target.value.toLowerCase();
        return filtered.includes(filter);
      });
    } else {
      newList = this.state.constantList;
    }

    this.setState({ vendorList: newList });
  }

  resetValues(event: any) {
    axios.get(url + "/search").then(res => {
      console.log("Data recieved:" + res.data);
      this.setState({ vendorList: res.data });
    });
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
                defaultHref={`/home/${this.props.match.params.id}`}
              />
            </IonButtons>
            <IonSearchbar
              inputMode="search"
              onIonChange={this.handleInput}
              onIonClear={this.resetValues}
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {this.state.vendorList.map((each: any, i: any) => (
              <SearchItem
                key={i}
                userId={this.props.match.params.id}
                vendorId={each["id"]}
                name={each["name"]}
              />
            ))}{" "}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default Search;
