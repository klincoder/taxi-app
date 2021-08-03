// Import resources
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Image,
  Text,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../redux/slices/navSlice";
import NavFavorites from "../components/NavFavorites";

// Component
function HomeScreen() {
  // Define redux dispatch
  const dispatch = useDispatch();

  // Return
  return (
    <SafeAreaView style={[tw`bg-white h-full`, styles.screen]}>
      <View style={tw`p-5`}>
        <View style={tw`flex-row justify-between`}>
          {/** Logo */}
          <Image
            style={styles.logo}
            source={{
              uri: "https://links.papareact.com/gzs",
            }}
          />
          {/** Greetings */}
          <Text style={tw`pt-10 text-xl`}>Hi, Klin Coder</Text>
        </View>

        {/** Google places autocomplete */}
        <GooglePlacesAutocomplete
          placeholder="Where are you?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={originInputStyles}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log("Details", details.geometry.location);
            // console.log("Data", data.description);
            // Dispatch data to redux store
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            // Set origin as null to protect ourselves
            dispatch(setDestination(null));
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
            components: "country:gh",
          }}
        />

        {/** Nav options */}
        <NavOptions />

        {/** Nav favorites */}
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
}

// Export
export default HomeScreen;

// Styles
const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

// Origin input styles
const originInputStyles = StyleSheet.create({
  container: {
    flex: 0,
  },
  textInput: {
    fontSize: 18,
  },
  textInputContainer: {
    backgroundColor: "#f2f2f2",
  },
});
