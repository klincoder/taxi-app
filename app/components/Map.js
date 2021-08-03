// Import resources
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../redux/slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

// Component function
function Map() {
  // Select destionation from redux state
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  //console.log("Destination: ", destination, "Origin: ", origin);

  // Define useRef for Map manipulation
  const mapRef = useRef(null);

  // Define dispacth
  const dispatch = useDispatch();

  // Change map directions view
  // Each time origin or destination changes
  useEffect(() => {
    // If no origin or destination, ignore code
    if (!origin || !destination) return;

    // Zoom and fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  // Calculate the travel time
  // Dependent on origin, destintion, GOOGLE_MAPS_APIKEY
  useEffect(() => {
    // Check if origin and destination exist
    if (!origin || !destination) return;

    // Call async function
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          // Debug data received
          //console.log(data);
          // Dispatch data to redux
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };

    // Call function
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  // Return
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {/** If origin and destination exist, show map directions */}
      {origin && destination && (
        <MapViewDirections
          lineDashPattern={[0]}
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {/** Origin marker */}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {/** Destination marker */}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
}

// Export component
export default Map;
