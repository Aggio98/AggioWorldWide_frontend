import { useMap } from "react-leaflet";

const MapController = ({ location }) => {
  const map = useMap();
  map.setView(location);
  return <></>;
};

export default MapController;
