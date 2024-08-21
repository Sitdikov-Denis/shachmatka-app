"use client";
import React from "react";
import ApplyCard from "./ApplyCard"; // Import ApplyCard component

// Interfaces for employees and applications
interface Application {
  ID: number;
  UF_COMMENT: string;
  DATE_CREATE: string;
  CATEGORY: {
    ID: number;
    NAME: string;
    BACKGROUND: string;
    COLOR: string;
  };
  STAGE: {
    ID: string;
    NAME: string;
    COLOR: string;
  };
  CONTACT: {
    ID: number;
    NAME: string;
    PHONE: string;
  };
  ASSIGNED_BY: {
    ID: number;
    NAME: string;
  };
}


interface LocationInfo {
  houseNumber: string;
  approachNumber: string;
  floorNumber: string;
  premiseNumber: string;
}

interface ApplyCardsProps {
  applications: Application[];
  location: LocationInfo; // Передаем отфильтрованные данные от сервера
}

const ApplyCards: React.FC<ApplyCardsProps> = ({ applications, location }) => {
  return (
    <div>
      <div>
        Дом №{location.houseNumber} / Подъезд №{location.approachNumber} / Этаж №{location.floorNumber} / Помещение №{location.premiseNumber}
      </div>
      {applications.map((application, index) => (
        <ApplyCard
          key={`${application.ID}-${index}`}
          apply={application}
          location={{
            houseNumber: "N/A", // Если нужно, можно добавить информацию о доме
            approachNumber: "N/A",
            floorNumber: "N/A",
            premiseNumber: "N/A",
          }}
        />
      ))}
    </div>
  );
};

export default ApplyCards;
