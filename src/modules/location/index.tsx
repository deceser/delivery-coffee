import React from "react";

import { useLocationData } from "./hooks/useGeolocation";

import LocationComponent from "./components/UserLocation";

type Props = {};

export const Location = (props: Props) => {
  const { loading, locationData, getLocation } = useLocationData();
  const [currentLocationData, setCurrentLocationData] = React.useState<any | null>(null);

  React.useEffect(() => {
    const getLocationDataFromLocalStorage = () => {
      try {
        const data = localStorage.getItem("locationData");
        if (data) {
          return JSON.parse(data);
        }
      } catch (error) {
        console.error("Error while getting location data from local storage:", error);
      }
      return null;
    };

    // Get the location data from local storage or the API fetch
    const dataFromLocalStorage = getLocationDataFromLocalStorage();
    setCurrentLocationData(dataFromLocalStorage);

    // Automatically fetch location data when the component mounts
    getLocation();
  }, []);

  React.useEffect(() => {
    // Update the currentLocationData when locationData changes
    setCurrentLocationData(locationData);
  }, [locationData]);

  return <LocationComponent loading={loading} currentLocationData={currentLocationData} />;
};
