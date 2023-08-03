import React from "react";
import { MapPin } from "phosphor-react";

import useLocationData from "../hooks/useGeolocation";

const LocationComponent: React.FC = () => {
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

  return (
    <div>
      {currentLocationData ? (
        <div className="flex items-center gap-[4px] p-[8px] text-purple-500 rounded-[6px] select-none bg-purple-100 max-sm:text-[11px] max-sm:font-bold">
          <MapPin size={22} weight="fill" />
          <p> {currentLocationData.address.city || "N/A"}, </p>
          <p>{currentLocationData.address.country || "N/A"}</p>
        </div>
      ) : (
        <div className="flex items-center gap-[4px] p-[8px] text-purple-500 rounded-[6px] select-none bg-purple-100">
          <MapPin size={22} weight="fill" />
          {loading ? "" : ""}
        </div>
      )}
    </div>
  );
};

export { LocationComponent };
