// Import resources
import React from "react";
import { View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

// Component function
function MapScreen() {
  // Define stack navigation
  const Stack = createNativeStackNavigator();

  // Return
  return (
    <View>
      <Text>Map Screen</Text>

      {/** Setup 2 views */}
      {/** Map view */}
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      {/** Choose origin view */}
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
}

// Export component
export default MapScreen;
