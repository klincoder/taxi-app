// Import resources
import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../redux/slices/navSlice";
import { useNavigation } from "@react-navigation/core";
import NavFavorites from "./NavFavorites";

// Import custom files

// Component function
function NavigateCard() {
  // Define dispatch
  const dispatch = useDispatch();

  // Set use navigation hook
  const navigation = useNavigation();

  // Return
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Where to?</Text>

      {/** View */}
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Enter destination"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            styles={destinationInputStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              //   console.log("Details", details.geometry.location);
              //   console.log("Data", data.description);
              // Dispatch origin data to redux store
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              // Navigate to ride options card
              navigation.navigate("RideOptionsCard");
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
              components: "country:gh",
            }}
          />
        </View>

        {/** Nav favorites */}
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
}

// Component styles
const destinationInputStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#f2f2f2",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

// Export component
export default NavigateCard;
