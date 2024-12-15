'use client'
import Image from "next/image";
import GraphPage from "./graph/graph";
import OmanMap from "./maps/omanmap";
import { useState } from "react";


export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationData = {
    A: {
      measured: 0.250,
      predicted: 0.350,
      flow: 1000,
      upperBound: 0.400,
      lowerBound: 0.300
    },
    B: {
      measured: 0.300,
      predicted: 0.400,
      flow: 1200,
      upperBound: 0.450,
      lowerBound: 0.350
    },
    C: {
      measured: 0.280,
      predicted: 0.320,
      flow: 800,
      upperBound: 0.370,
      lowerBound: 0.270
    }
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(selectedLocation === location ? null : location);
  };
  return (
    <div className="w-screen max-w-[100%] min-h-screen bg-white overflow-x-hidden">
      <h1 className="pt-2 w-full text-center text-8xl font-bold text-black">Data Summary</h1>

      {/* Graph Section */}
      <div className="w-full h-full px-[10%] gap-10 mb-10 flex justify-center items-center flex-col">
        <div className="pt-2 w-full text-left text-3xl justify-center items-center font-semibold text-black flex flex-row gap-5">
          <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 5V19C4 19.5523 4.44772 20 5 20H19" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 9L13 13.9999L10.5 11.4998L7 14.9998" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="pt-2 w-full text-left text-3xl font-semibold text-black">Graph</h1>
        </div>
        <div className="w-full h-[1px] bg-black"></div>
        <GraphPage/>
      </div>

      {/* Map Section */}
      <div className="w-full h-full px-[10%] gap-10 flex justify-center items-center flex-col">
        <div className="pt-2 w-full text-left text-3xl justify-center items-center font-semibold text-black flex flex-row gap-5">
          <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6H12.01M9 20L3 17V4L5 5M9 20L15 17M9 20V14M15 17L21 20V7L19 6M15 17V14M15 6.2C15 7.96731 13.5 9.4 12 11C10.5 9.4 9 7.96731 9 6.2C9 4.43269 10.3431 3 12 3C13.6569 3 15 4.43269 15 6.2Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="pt-2 w-full text-left text-3xl font-semibold text-black">Map</h1>
        </div>
        <div className="w-full h-[1px] bg-black"></div>

        <div className="grid grid-cols-2 w-full h-full mb-10 justify-center items-start gap-4">
          <OmanMap />
          <div className="w-full flex items-center flex-col gap-10 h-full">
            {['A', 'B', 'C'].map((location) => (
              <div 
                key={location}
                className={`${
                  selectedLocation === location ? 'scale-105' : ''
                } ${
                  location === 'A' ? 'bg-blue-100 hover:bg-blue-200' :
                  location === 'B' ? 'bg-red-100 hover:bg-red-200' :
                  'bg-yellow-100 hover:bg-yellow-200'
                } w-[80%] rounded-xl text-black p-4 cursor-pointer transition-all shadow-md`}
                onClick={() => handleLocationClick(location)}
              >
                <h3 className="font-semibold mb-2">Location {location}</h3>
                {selectedLocation === location && (
                  <>
                    <p className="text-red-600">Corrosion rate: {locationData[location].measured.toFixed(3)} mm/year</p>
                    <p className="text-blue-600">Predicted corrosion rate: {locationData[location].predicted.toFixed(3)} mm/year</p>
                    <p className="text-yellow-600">Flow rate: {locationData[location].flow} m³/day</p>
                    <p className="text-orange-400">Upper Bound: {locationData[location].upperBound.toFixed(3)} mm/year</p>
                    <p className="text-orange-400">Lower Bound: {locationData[location].lowerBound.toFixed(3)} mm/year</p>
                  </>
                )}
                {selectedLocation !== location && (
                  <p>Click to view details</p>
                )}
              </div>
            ))}
          </div>
      </div>
    </div>
    </div>
  );
}