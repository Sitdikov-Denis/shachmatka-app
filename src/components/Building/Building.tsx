import React, { useState, useEffect, useRef } from "react";
import styles from "./Building.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApplyCards from "../ApplyCard/ApplyCards";
import applies from "../data/applies";
import categoriesData from "../data/categories";
import stagesData from "../data/stages";
import employeesData from "../data/employess";

interface Premise {
  ID: number;
  UF_NUMBER: string;
  REQUESTS_OPENED_COUNT: number;
  REQUESTS_OVERDUE_COUNT: number;
}

interface Floor {
  ID: number;
  UF_NUMBER: number;
  PREMISES: Premise[];
}

interface Approach {
  ID: number;
  UF_NUMBER: number;
  FLOORS: Floor[];
}

interface Building {
  ID: number;
  NUMBER: string;
  UF_FLOOR_COUNT: number;
  FLATS: {
    APPROACHES: Approach[];
  };
  CARPLACES?: {
    FLOORS: Floor[];
  };
  PANTRIES?: {
    FLOORS: Floor[];
  };
  LOBBY?: {
    FLOORS: Floor[];
  };
  BASEMENT?: {
    PREMISES: Premise[];
  };
  ATTIC?: {
    PREMISES: Premise[];
  };
}

interface BuildingProps {
  building: Building;
}

interface AppliedFilters {
  startDate?: Date;
  endDate?: Date;
  direction: string;
  selectedStatuses: number[];
  responsible: number | null;
}

const Building: React.FC<BuildingProps> = ({ building }) => {

  const apiUrl = process.env.API_BASE_URL;
  const userName = process.env.API_USERNAME
  const password = process.env.API_PASSWORD

  const [selectedEntrance, setSelectedEntrance] = useState<number | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<
    number | "все" | "Подвал" | "Чердак" | "Парковка" | null
  >(null);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isFloorDropdownOpen, setIsFloorDropdownOpen] = useState(false);
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);
  const [roomsForFloor, setRoomsForFloor] = useState<Premise[]>([]);
  const [applications, setApplications] = useState<any[]>(applies.data);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [direction, setDirection] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<number[]>([]);
  const [responsible, setResponsible] = useState<number | null>(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    startDate: undefined,
    endDate: undefined,
    direction: "",
    selectedStatuses: [],
    responsible: null,
  });

  const floorDropdownRef = useRef<HTMLDivElement>(null);
  const roomDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const responsibleDropdownRef = useRef<HTMLDivElement>(null);

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] =
    useState<boolean>(false);
  const [isResponsibleDropdownOpen, setIsResponsibleDropdownOpen] =
    useState<boolean>(false);

  const approaches: Approach[] = building.FLATS.APPROACHES;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        floorDropdownRef.current &&
        !floorDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFloorDropdownOpen(false);
      }
      if (
        roomDropdownRef.current &&
        !roomDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRoomDropdownOpen(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
      if (
        responsibleDropdownRef.current &&
        !responsibleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsResponsibleDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (
      selectedEntrance !== null &&
      selectedFloor !== null &&
      selectedFloor !== "все"
    ) {
      const selectedApproach = approaches.find(
        (approach) => approach.UF_NUMBER === selectedEntrance
      );
      if (selectedApproach) {
        const floor = selectedApproach.FLOORS.find(
          (floor) => floor.UF_NUMBER === selectedFloor
        );
        if (floor) {
          setRoomsForFloor(floor.PREMISES);
        } else {
          setRoomsForFloor([]);
        }
      }
    } else if (selectedEntrance !== null) {
      const selectedApproach = approaches.find(
        (approach) => approach.UF_NUMBER === selectedEntrance
      );
      if (selectedApproach) {
        const allRooms = selectedApproach.FLOORS.flatMap(
          (floor) => floor.PREMISES
        );
        setRoomsForFloor(allRooms);
      }
    } else if (selectedFloor === "Подвал" && building.BASEMENT) {
      setRoomsForFloor(building.BASEMENT.PREMISES);
    } else if (selectedFloor === "Чердак" && building.ATTIC) {
      setRoomsForFloor(building.ATTIC.PREMISES);
    } else if (selectedFloor === "Парковка" && building.CARPLACES) {
      const allCarplaces = building.CARPLACES.FLOORS.flatMap(
        (floor) => floor.PREMISES
      );
      setRoomsForFloor(allCarplaces);
    } else if (selectedFloor !== null && selectedFloor !== "все") {
      const allRooms = approaches.flatMap((approach) =>
        approach.FLOORS.filter(
          (floor) => floor.UF_NUMBER === selectedFloor
        ).flatMap((floor) => floor.PREMISES)
      );
      setRoomsForFloor(allRooms);
    } else if (selectedFloor === "все") {
      const allRooms = approaches.flatMap((approach) =>
        approach.FLOORS.flatMap((floor) => floor.PREMISES)
      );
      setRoomsForFloor(allRooms);
    } else {
      setRoomsForFloor([]);
    }
  }, [selectedFloor, selectedEntrance, approaches, building]);

  const handleEntranceChange = (entrance: number) => {
    if (selectedEntrance === entrance) {
      setSelectedEntrance(null);
      setSelectedFloor(null);
      setSelectedRoom(null);
      setRoomsForFloor([]);
    } else {
      setSelectedEntrance(entrance);
      setSelectedFloor("все");
      setSelectedRoom(null);
    }
  };

  const handleFloorChange = (
    floor: number | "Подвал" | "Чердак" | "Парковка" | "все"
  ) => {
    setSelectedFloor(floor);
    setSelectedRoom(null);
    setIsFloorDropdownOpen(false);
  };

  const handleRoomChange = (room: number | null) => {
    setSelectedRoom(room);
    setIsRoomDropdownOpen(false);
  };

  const handleStatusChange = (statusId: number) => {
    if (selectedStatuses.includes(statusId)) {
      setSelectedStatuses(selectedStatuses.filter((id) => id !== statusId));
    } else {
      setSelectedStatuses([...selectedStatuses, statusId]);
    }
  };

  const handleRemoveStatus = (statusId: number) => {
    setSelectedStatuses(selectedStatuses.filter((id) => id !== statusId));
    const updatedFilters = {
      ...appliedFilters,
      selectedStatuses: selectedStatuses.filter((id) => id !== statusId),
    };
    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handleRemoveFilter = (filterKey: keyof AppliedFilters) => {
    const updatedFilters = { ...appliedFilters, [filterKey]: undefined };

    if (filterKey === "selectedStatuses") {
      setSelectedStatuses([]);
      updatedFilters.selectedStatuses = [];
    } else if (filterKey === "direction") {
      setDirection("");
      updatedFilters.direction = "";
    } else if (filterKey === "responsible") {
      setResponsible(null);
      updatedFilters.responsible = null;
    } else if (filterKey === "startDate" || filterKey === "endDate") {
      if (filterKey === "startDate") {
        setStartDate(undefined);
        updatedFilters.startDate = undefined;
      } else {
        setEndDate(undefined);
        updatedFilters.endDate = undefined;
      }
    }
    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };



  const applyFilters = (newFilters?: AppliedFilters) => {
    const filters = newFilters || {
      startDate,
      endDate,
      direction,
      selectedStatuses,
      responsible,
    };

    setAppliedFilters(filters);

    const params = new URLSearchParams();
    if (filters.startDate) {
      params.append("startDate", filters.startDate.toISOString());
    }
    if (filters.endDate) {
      params.append("endDate", filters.endDate.toISOString());
    }
    if (filters.direction) {
      params.append("direction", filters.direction);
    }
    if (filters.selectedStatuses.length) {
      params.append("statuses", filters.selectedStatuses.join(","));
    }
    if (filters.responsible) {
      params.append("responsible", filters.responsible.toString());
    }

    // fetch(`${apiUrl}/dashboard/application?${params.toString()}`)
    //   .then((response) => response.json())
    //   .then((data) => setApplications(data))
    //   .catch(() => setApplications(applies.data));

      fetch(`${apiUrl}/dashboard/application?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${userName}:${password}`)}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setApplications(data))
        .catch(() => setApplications(applies.data));

    setIsFilterModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setDirection("");
    setSelectedStatuses([]);
    setResponsible(null);
    setSelectedEntrance(null);
    setSelectedFloor(null);
    setSelectedRoom(null);
    setRoomsForFloor([]);
    setApplications(applies.data);
    setAppliedFilters({
      startDate: undefined,
      endDate: undefined,
      direction: "",
      selectedStatuses: [],
      responsible: null,
    });
  };

  const generateCellsForApproach = (approach: Approach) => {
    return approach.FLOORS.slice()
      .reverse()
      .map((floor) => (
        <div
          key={`floor-${approach.UF_NUMBER}-${floor.UF_NUMBER}`}
          style={{ display: "flex", gap: "3px" }}
        >
          {floor.PREMISES.map((premise) => {
            const isSelected = isCellSelected(
              approach.UF_NUMBER,
              floor.UF_NUMBER,
              premise.ID
            );
            const isOpenGreater =
              premise.REQUESTS_OPENED_COUNT > premise.REQUESTS_OVERDUE_COUNT;
            const isOverdueGreater =
              premise.REQUESTS_OPENED_COUNT < premise.REQUESTS_OVERDUE_COUNT;
            const noRequests =
              premise.REQUESTS_OPENED_COUNT === 0 &&
              premise.REQUESTS_OVERDUE_COUNT === 0;
            const cellClass = `${styles.cell} ${
              isSelected ? styles.selected : ""
            } ${
              !isSelected && !noRequests && isOpenGreater
                ? styles.openGreater
                : ""
            } ${
              !isSelected && !noRequests && isOverdueGreater
                ? styles.overdueGreater
                : ""
            }`;
            return (
              <div
                key={`cell-${floor.UF_NUMBER}-${premise.ID}`}
                onClick={() =>
                  handleCellClick(
                    approach.UF_NUMBER,
                    floor.UF_NUMBER,
                    premise.ID
                  )
                }
                className={cellClass}
              >
                {premise.UF_NUMBER}
              </div>
            );
          })}
        </div>
      ));
  };

  const generateFloorLabels = () => {
    const maxFloors = Math.max(
      ...approaches.flatMap((approach) =>
        approach.FLOORS.map((floor) => floor.UF_NUMBER)
      )
    );

    const regularFloors = Array.from(
      { length: maxFloors },
      (_, index) => maxFloors - index
    );

    return (
      <>
        <div
          key={`floor-label-attic`}
          className={`${styles.floorLabel} ${
            selectedFloor === "Чердак" ? styles.selectedFloor : ""
          }`}
          onClick={() => handleFloorLabelClick("Чердак")}
        >
          Чердак
        </div>
        {regularFloors.map((floorNumber) => (
          <div
            key={`floor-label-${floorNumber}`}
            className={`${styles.floorLabel} ${
              selectedFloor === floorNumber ? styles.selectedFloor : ""
            }`}
            onClick={() => handleFloorLabelClick(floorNumber)}
          >
            {floorNumber}
          </div>
        ))}
        <div>
          <div
            key={`floor-label-basement`}
            className={`${styles.floorLabel} ${
              selectedFloor === "Подвал" ? styles.selectedFloor : ""
            }`}
            onClick={() => handleFloorLabelClick("Подвал")}
          >
            Подвал
          </div>
          <div
            key={`floor-label-carplace`}
            className={`${styles.floorLabel} ${
              selectedFloor === "Парковка" ? styles.selectedFloor : ""
            }`}
            onClick={() => handleFloorLabelClick("Парковка")}
          >
            Парковка
          </div>
        </div>
      </>
    );
  };

  const generateAdditionalStructures = (
    structureName: string,
    floors: Floor[] | undefined,
    structureType: "Подвал" | "Чердак" | "Парковка"
  ) => {
    if (!floors) return null;
    return (
      <div className={styles.additionalStructure}>
        {floors.map((floor, index) => (
          <div
            key={`additional-${structureName}-${index}`}
            style={{ display: "flex", gap: "3px" }}
          >
            {floor.PREMISES.map((premise) => {
              const isSelected = isCellSelected(
                null,
                structureType,
                premise.ID
              );
              const isOpenGreater =
                premise.REQUESTS_OPENED_COUNT > premise.REQUESTS_OVERDUE_COUNT;
              const isOverdueGreater =
                premise.REQUESTS_OPENED_COUNT < premise.REQUESTS_OVERDUE_COUNT;
              const noRequests =
                premise.REQUESTS_OPENED_COUNT === 0 &&
                premise.REQUESTS_OVERDUE_COUNT === 0;
              const cellClass = `${styles.cell} ${
                isSelected ? styles.selected : ""
              } ${
                !isSelected && !noRequests && isOpenGreater
                  ? styles.openGreater
                  : ""
              } ${
                !isSelected && !noRequests && isOverdueGreater
                  ? styles.overdueGreater
                  : ""
              }`;
              return (
                <div
                  key={`additional-cell-${structureName}-${premise.ID}`}
                  onClick={() =>
                    handleCellClick(null, structureType, premise.ID)
                  }
                  className={cellClass}
                  style={{ width: "100%" }}
                >
                  {premise.UF_NUMBER}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const generateBasementAndAttic = (
    structureName: string,
    premises: Premise[] | undefined,
    structureType: "Подвал" | "Чердак"
  ) => {
    if (!premises) return null;
    return (
      <div className={styles.additionalStructure}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {premises.map((premise) => {
            const isSelected = isCellSelected(null, structureType, premise.ID);
            const isOpenGreater =
              premise.REQUESTS_OPENED_COUNT > premise.REQUESTS_OVERDUE_COUNT;
            const isOverdueGreater =
              premise.REQUESTS_OPENED_COUNT < premise.REQUESTS_OVERDUE_COUNT;
            const noRequests =
              premise.REQUESTS_OPENED_COUNT === 0 &&
              premise.REQUESTS_OVERDUE_COUNT === 0;
            const cellClass = `${styles.cell} ${
              isSelected ? styles.selected : ""
            } ${
              !isSelected && !noRequests && isOpenGreater
                ? styles.openGreater
                : ""
            } ${
              !isSelected && !noRequests && isOverdueGreater
                ? styles.overdueGreater
                : ""
            }`;
            return (
              <div
                key={`additional-cell-${structureName}-${premise.ID}`}
                onClick={() => handleCellClick(null, structureType, premise.ID)}
                className={cellClass}
                style={{ width: "100%" }}
              >
                {premise.UF_NUMBER}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const isCellSelected = (
    entrance: number | null,
    floor: number | "Подвал" | "Чердак" | "Парковка",
    room: number
  ) => {
    if (selectedEntrance !== null && selectedEntrance !== entrance)
      return false;
    if (
      selectedFloor !== "все" &&
      selectedFloor !== null &&
      selectedFloor !== floor
    )
      return false;
    if (selectedRoom !== null && selectedRoom !== room) return false;
    return (
      selectedEntrance !== null ||
      selectedFloor !== null ||
      selectedRoom !== null
    );
  };

  const handleCellClick = (
    entrance: number | null,
    floor: number | "Подвал" | "Чердак" | "Парковка",
    room: number
  ) => {
    if (
      selectedEntrance === entrance &&
      selectedFloor === floor &&
      selectedRoom === room
    ) {
      setSelectedEntrance(null);
      setSelectedFloor(null);
      setSelectedRoom(null);
    } else {
      setSelectedEntrance(entrance);
      setSelectedFloor(floor);
      setSelectedRoom(room);
    }
  };

  const handleFloorLabelClick = (
    floor: number | "Подвал" | "Чердак" | "Парковка"
  ) => {
    if (selectedFloor === floor) {
      setSelectedFloor(null);
      setSelectedEntrance(null);
      setSelectedRoom(null);
      setRoomsForFloor([]);
    } else {
      setSelectedEntrance(null);
      setSelectedFloor(floor);
      setSelectedRoom(null);
    }
  };

  const location = {
    houseNumber: building.NUMBER || "",
    approachNumber: selectedEntrance ? selectedEntrance.toString() : "",
    floorNumber: selectedFloor ? selectedFloor.toString() : "",
    premiseNumber: selectedRoom ? selectedRoom.toString() : "",
  };

  const closeModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.buildingHeading}>Дом №{building.NUMBER}</h2>

        <div className={styles.filters}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            marginRight: "20px",
          }}
        >
          <label htmlFor="room-select" style={{ marginRight: "5px" }}>
            Подъезд:
          </label>
          {approaches.map((approach) => (
            <button
              key={approach.ID}
              onClick={() => handleEntranceChange(approach.UF_NUMBER)}
              className={`${styles.filterButton} ${
                selectedEntrance === approach.UF_NUMBER
                  ? styles.selectedEntrance
                  : styles.defaultButton
              }`}
            >
              {approach.UF_NUMBER}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            marginRight: "20px",
          }}
        >
          <label htmlFor="room-select" style={{ marginRight: "5px" }}>
            Этаж:
          </label>
          <div
            className={styles.floorDropdown}
            onClick={() => setIsFloorDropdownOpen(!isFloorDropdownOpen)}
            ref={floorDropdownRef}
          >
            {selectedFloor === "все"
              ? "Все этажи"
              : selectedFloor || (
                  <div style={{ display: "flex" }}>
                    <div>Этаж</div>
                    <div className={styles.arrow}></div>
                  </div>
                )}
            <div
              className={styles.floorDropdownList}
              style={{ display: isFloorDropdownOpen ? "block" : "none" }}
            >
              <div
                onClick={() => handleFloorChange("все")}
                className={`${styles.floorDropdownItem} ${
                  selectedFloor === "все" ? styles.selected : ""
                }`}
              >
                Все этажи
              </div>
              {generateFloorLabels()}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label htmlFor="room-select" style={{ marginRight: "5px" }}>
            Помещение:
          </label>
          <div
            ref={roomDropdownRef}
            onClick={() => setIsRoomDropdownOpen(!isRoomDropdownOpen)}
            className={styles.roomDropdown}
          >
            {selectedRoom === null ? (
              <div style={{ display: "flex" }}>
                <div>Все</div>
                <div className={styles.arrow}></div>
              </div>
            ) : (
              selectedRoom
            )}
            <div
              className={styles.roomDropdownList}
              style={{ display: isRoomDropdownOpen ? "block" : "none" }}
            >
              <div
                onClick={() => handleRoomChange(null)}
                className={styles.roomDropdownItem}
              >
                Все помещения
              </div>
              {roomsForFloor.map((room) => (
                <div
                  key={room.ID}
                  onClick={() => handleRoomChange(room.ID)}
                  className={`${styles.roomDropdownItem} ${
                    selectedRoom === room.ID ? styles.selected : ""
                  }`}
                >
                  {room.UF_NUMBER}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginRight: "18px",
              paddingTop: "30px",
              paddingBlockEnd: "30px",
            }}
            className={styles.floorLabelsColumn}
          >
            {generateFloorLabels()}
          </div>
          <div className={styles.buildingSchema} style={{ display: "block" }}>
            <div className={styles.approachLabels}>
              {approaches.map((approach) => (
                <div
                  key={approach.ID}
                  onClick={() => handleEntranceChange(approach.UF_NUMBER)}
                  className={styles.approachLabel}
                >
                  Подъезд №{approach.UF_NUMBER}
                </div>
              ))}
            </div>
            <div style={{ width: "100%", marginBottom: "3px" }}>
              {generateBasementAndAttic(
                "Чердак",
                building.ATTIC?.PREMISES,
                "Чердак"
              )}
            </div>
            <div style={{ display: "flex", gap: "3px" }}>
              {approaches.map((approach) => (
                <div key={approach.ID} className={styles.building}>
                  {generateCellsForApproach(approach)}
                </div>
              ))}
            </div>
            <div style={{ width: "100%", marginTop: "3px" }}>
              <div style={{ marginBottom: "3px" }}>
                {generateBasementAndAttic(
                  "Подвал",
                  building.BASEMENT?.PREMISES,
                  "Подвал"
                )}
              </div>

              {generateAdditionalStructures(
                "Парковка",
                building.CARPLACES?.FLOORS,
                "Парковка"
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            className={styles.openFilterButton}
            onClick={() => setIsFilterModalOpen(true)}
          >
            Показать фильтры
          </button>
          <div className={styles.appliedFilters}>
            {appliedFilters.startDate && appliedFilters.endDate && (
              <div className={styles.filterChip}>
                Дата:{" "}
                {`${appliedFilters.startDate.toLocaleDateString()} - ${appliedFilters.endDate.toLocaleDateString()}`}
                <button
                  className={styles.removeFilterButton}
                  onClick={() => handleRemoveFilter("startDate")}
                >
                  ×
                </button>
              </div>
            )}
            {appliedFilters.direction && (
              <div className={styles.filterChip}>
                Направление:{" "}
                {
                  categoriesData.data.find(
                    (cat) => cat.ID.toString() === appliedFilters.direction
                  )?.NAME
                }
                <button
                  className={styles.removeFilterButton}
                  onClick={() => handleRemoveFilter("direction")}
                >
                  ×
                </button>
              </div>
            )}

            {appliedFilters.selectedStatuses.length > 0 && (
              <div className={styles.filterChip}>
                Статус сделки:{" "}
                {appliedFilters.selectedStatuses
                  .map(
                    (statusId) =>
                      stagesData.data.find((status) => status.ID === statusId)
                        ?.NAME
                  )
                  .join(", ")}
                <button
                  className={styles.removeFilterButton}
                  onClick={() => handleRemoveFilter("selectedStatuses")}
                >
                  ×
                </button>
              </div>
            )}
            {appliedFilters.responsible && (
              <div className={styles.filterChip}>
                Ответственный:{" "}
                {
                  employeesData.data.find(
                    (emp) => emp.ID === appliedFilters.responsible
                  )?.NAME
                }
                <button
                  className={styles.removeFilterButton}
                  onClick={() => handleRemoveFilter("responsible")}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <ApplyCards applications={applications} location={location} />

        {isFilterModalOpen && (
          <div className={styles.filterModalOverlay} onClick={closeModal}>
            <div
              className={styles.filterModal}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeFilterButton} onClick={closeModal}>
                ×
              </button>
              <form onSubmit={handleSubmit} className={styles.filterForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Дата</label>
                  <div className={styles.dateRangeContainer}>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date ?? undefined)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd.MM.yyyy"
                      placeholderText="Начало"
                      className={styles.datePicker}
                    />
                    <span className={styles.dateSeparator}>–</span>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date ?? undefined)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd.MM.yyyy"
                      placeholderText="Конец"
                      className={styles.datePicker}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Направление</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                  >
                    <option className={styles.optionForm} value="">
                      Выберите направление
                    </option>
                    {categoriesData.data.map((category) => (
                      <option key={category.ID} value={category.ID}>
                        {category.NAME}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Статус сделки</label>
                  <div
                    className={styles.statusInputWrapper}
                    onClick={() =>
                      setIsStatusDropdownOpen(!isStatusDropdownOpen)
                    }
                  >
                    <div className={styles.statusInput}>
                      {selectedStatuses.map((statusId) => {
                        const status = stagesData.data.find(
                          (s) => s.ID === statusId
                        );
                        return (
                          status && (
                            <div
                              className={styles.selectedStatus}
                              key={statusId}
                            >
                              {status.NAME}
                              <button
                                type="button"
                                onClick={() => handleRemoveStatus(statusId)}
                                className={styles.removeStatusButton}
                              >
                                x
                              </button>
                            </div>
                          )
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      className={styles.addStatusButton}
                      onClick={() =>
                        setIsStatusDropdownOpen(!isStatusDropdownOpen)
                      }
                    >
                      + Добавить
                    </button>
                    {isStatusDropdownOpen && (
                      <div
                        className={styles.statusDropdown}
                        ref={statusDropdownRef}
                      >
                        {stagesData.data.map((status) => (
                          <div
                            key={status.ID}
                            onClick={() => handleStatusChange(status.ID)}
                            className={styles.statusOption}
                          >
                            {status.NAME}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Ответственный</label>
                  <div
                    className={styles.statusInputWrapper}
                    onClick={() =>
                      setIsResponsibleDropdownOpen(!isResponsibleDropdownOpen)
                    }
                  >
                    <div className={styles.statusInput}>
                      {responsible ? (
                        employeesData.data.find((emp) => emp.ID === responsible)
                          ?.NAME
                      ) : (
                        <span className={styles.optionForm}>
                          Выберите ответственного
                        </span>
                      )}
                    </div>
                  </div>
                  {isResponsibleDropdownOpen && (
                    <div
                      className={styles.responsibleDropdown}
                      ref={responsibleDropdownRef}
                    >
                      <div className={styles.responsibleDropdownGrid}>
                        {employeesData.data.map((employee) => (
                          <div
                            key={employee.ID}
                            onClick={() => {
                              setResponsible(employee.ID);
                              setIsResponsibleDropdownOpen(false);
                            }}
                            className={styles.responsibleOption}
                          >
                            <div className={styles.responsibleOptionName}>
                              {employee.NAME}
                            </div>
                            <div className={styles.responsibleOptionPosition}>
                              {employee.POSITION}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.searchButton}>
                    Найти
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className={styles.resetButton}
                  >
                    Сбросить
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Building;
