import { IonPage } from "@ionic/react";
import React from "react";
import mapboxgl from "mapbox-gl";
import "../../theme/map.css";
import axios from "axios";
import url from "../../server_url";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYm11bG1pIiwiYSI6ImNrN2t3YTRkbjAxZG0zZXJyaWsyeG0ycnoifQ.B8842nJdR1uhz0lirF_WYQ";

export interface MapsProps {
  match: any;
}

export interface MapsState {
  vendors: any;
}

class Maps extends React.Component<MapsProps, MapsState> {
  mapContainer = React.createRef<any>();
  map: any;

  constructor(props: any) {
    super(props);
    this.state = {
      vendors: []
    };
    this.search = this.search.bind(this);
    this.loadPopups = this.loadPopups.bind(this);
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.177022, 41.081136],
      zoom: 10
    });

    this.loadPopups();
  }

  loadPopups = async () => {
    let res = await axios.get(url + "/search");
    let temp = res.data;
    let coordinates = new Array(temp.length - 1);
    let marker = new Array(temp.length - 1);
    let popup = new Array(temp.length - 1);
    for (var i = 0; i < temp.length; i++) {
      // console.log(temp[i].name);
      // console.log(temp[i].longitude + "," + temp[i].latitude);
      coordinates[i] = {
        longitude: temp[i].longitude,
        latitude: temp[i].latitude
      };
      popup[i] = new mapboxgl.Popup().setText(temp[i].name).on("click", () => {
        console.log(temp[i].id);
      });
      marker[i] = new mapboxgl.Marker()
        .setPopup(popup[i])
        .setLngLat([temp[i].longitude, temp[i].latitude])
        .addTo(this.map);
    }
  };

  search(query: string) {
    var uri =
      "https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(query) +
      ".json" +
      "?access_token=" +
      mapboxgl.accessToken;

    axios
      .get(uri)
      .then(res => console.log(query + " ---> " + res.data.features[0].center));
  }

  render() {
    return (
      <IonPage>
        <div>
          <div ref={this.mapContainer} className="mapContainer" />
        </div>
      </IonPage>
    );
  }
}

export default Maps;
