import Leaflet from "leaflet";

import mapMarker from '../images/mapMarker.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarker,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  });

  export default mapIcon;