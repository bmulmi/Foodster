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
  currLat: number;
  currLon: number;
}

class Maps extends React.Component<MapsProps, MapsState> {
  mapContainer = React.createRef<any>();
  map: any;

  constructor(props: any, private geolocation: Geolocation) {
    super(props);
    this.state = {
      vendors: [],
      currLat: 0,
      currLon: 0
    };
    this.loadPopups = this.loadPopups.bind(this);
  }

  componentDidMount() {
    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    geolocate.on("geolocate", (e: any) => {
      this.setState({
        currLon: e.coords.longitude,
        currLat: e.coords.latitude
      });
    });

    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.177022, 41.081136],
      zoom: 11
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
    this.loadPopups();
  }

  loadPopups = async () => {
    // get all the vendors
    let res = await axios.get(url + "/search");

    // set all the necessary variables
    let temp = res.data;
    let marker = new Array(temp.length - 1);
    let popup = new Array(temp.length - 1);

    // set up popups and markers
    for (var i = 0; i < temp.length; i++) {
      popup[i] = new mapboxgl.Popup({
        closeOnClick: false,
        closeButton: false
      }).setHTML(
        '<a href="' +
          `/vendorpage/${temp[i].id}/${this.props.match.params.id}` +
          '">' +
          temp[i].name +
          "</a>"
      );
      marker[i] = new mapboxgl.Marker()
        .setPopup(popup[i])
        .setLngLat([temp[i].longitude, temp[i].latitude])
        .addTo(this.map)
        .togglePopup();
    }
  };

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
