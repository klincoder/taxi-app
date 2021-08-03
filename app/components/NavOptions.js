// Import resources
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../redux/slices/navSlice";

// Define nav options data
const data = [
  {
    id: "123",
    title: "Get a Ride",
    image: "https://links.papareact.com/3pn",
    screen: "Map",
  },
  {
    id: "456",
    title: "Order Food",
    image: "https://links.papareact.com/28w",
    screen: "Food", // Work on it in future
  },
];

// Component function
function NavOptions() {
  // Define useNavigation hook
  const navigation = useNavigation();

  // Select origin state
  const origin = useSelector(selectOrigin);

  // Return
  return (
    // Loop data
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrolba
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        // Make item touchable
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          disabled={!origin}
        >
          <View style={tw`${!origin && "opacity-20"}`}>
            <Image
              style={styles.dataImage}
              source={{
                uri: item.image,
              }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

// Component styles
const styles = StyleSheet.create({
  dataImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});

// Export component
export default NavOptions;
