// Import resources
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../redux/slices/navSlice";
import "intl";
import "intl/locale-data/jsonp/en-GH";

// Define data
const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "UberXL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "UberLUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// Set high demaind charge rate
const HIGH_DEMAND_RATE = 1.5;

// Component function
function RideOptionsCard() {
  // Define navigation
  const navigation = useNavigation();

  // Define state to keep track of ride selected
  const [rideSelected, setRideSelected] = useState(null);

  //  Select travel time information
  const travelTime = useSelector(selectTravelTimeInformation);

  // Return
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTime?.distance.text}
        </Text>
      </View>

      {/** Loop ride options */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setRideSelected(item)}
            style={tw`flex-row justify-between items-center px-5 ${
              item.id === rideSelected?.id && "bg-gray-200"
            }`}
          >
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTime?.duration.text} Ride</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-gh", {
                style: "currency",
                currency: "GHS",
                maximumSignificantDigits: 2,
              }).format(
                (travelTime?.duration.value *
                  HIGH_DEMAND_RATE *
                  item.multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/** Select ride button */}
      <View>
        <TouchableOpacity
          disabled={!rideSelected}
          style={tw`bg-black py-3 m-3 mb-12 ${!rideSelected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {rideSelected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Component styles
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
});

// Export component
export default RideOptionsCard;
