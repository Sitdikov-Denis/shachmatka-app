"use client";
import React, { useState, useEffect } from "react";
import Building from "../Building/Building";
import Square from "../Square/Square"; 
import buildingDataExample from "../data/buildingData";

const ResidentialComplex: React.FC = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(null);
  const [buildingData, setBuildingData] = useState<any>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const userName = process.env.NEXT_PUBLIC_API_USERNAME;
  const password = process.env.NEXT_PUBLIC_API_PASSWORD;

  const getComplexIdFromUrl = (): number => {
    const pathSegments = window.location.pathname.split("/");
    return parseInt(pathSegments[pathSegments.length - 1], 10);
  };

  const fetchBuildingData = async (complexId: number) => {
    try {
      const response = await fetch(
        `${apiUrl}/dashboard/premise/tree/${complexId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${btoa(`${userName}:${password}`)}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBuildingData(data);
      } else {
        console.error("Failed to fetch data from API, using fallback data");
        setBuildingData(buildingDataExample);
      }
    } catch (error) {
      console.error("Error fetching building data, using fallback data:", error);
      setBuildingData(buildingDataExample);
    }
  };

  useEffect(() => {
    const complexId = getComplexIdFromUrl();
    fetchBuildingData(complexId);
  }, []);

  const handleBuildingSelect = (buildingId: number | null) => {
    if (buildingId === null) return;
    setSelectedBuildingId((prevSelectedBuildingId) =>
      prevSelectedBuildingId === buildingId ? null : buildingId
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ backgroundColor: "white", width: "100%", paddingTop: "20px" }}>
        <Square
          onBuildingSelect={handleBuildingSelect}
          selectedBuildingId={selectedBuildingId}
        />
      </div>
      {selectedBuildingId !== null && buildingData && Array.isArray(buildingData.data) && (
        <Building
          key={selectedBuildingId}
          building={buildingData.data.find((b: any) => b.ID === selectedBuildingId)}
        />
      )}
    </div>
  );
};

export default ResidentialComplex;
