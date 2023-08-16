import React from "react";
import { MapPin } from "phosphor-react";

type Props = {
  loading: boolean;
  currentLocationData: any;
};

const LocationComponent = ({ ...props }: Props) => {
  const { loading, currentLocationData } = props;
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

export default LocationComponent;
