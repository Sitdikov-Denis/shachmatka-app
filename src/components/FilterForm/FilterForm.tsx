"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./FilterForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FilterFormProps {
  onFilter: (filters: {
    dateRange: string;
    direction: string;
    statuses: string[];
    responsible: string;
  }) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [direction, setDirection] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [availableStatuses] = useState<string[]>([
    "Ждет выполнения",
    "Выполняется",
    "Ждет контроля",
    "Отложена",
  ]);
  const [responsible, setResponsible] = useState<string>("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<boolean>(
    false
  );
  const [isResponsibleDropdownOpen, setIsResponsibleDropdownOpen] =
    useState<boolean>(false);
  const [responsibleList] = useState<string[]>([
    "Иванов Иван Иванович - Инженер",
    "Петров Петр Петрович - Техник",
    "Кузнецов Алексей Сергеевич - Техник",
    "Васильев Василий Васильевич - Техник",
    "Сидорова Мария Ивановна - Бухгалтер",
    "Смирнова Елена Викторовна - HR-специалист",
  ]);

  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const responsibleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const handleStatusChange = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const handleRemoveStatus = (status: string) => {
    setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateRange =
      startDate && endDate
        ? `${startDate.toLocaleDateString()} – ${endDate.toLocaleDateString()}`
        : "";
    const filters = {
      dateRange,
      direction,
      statuses: selectedStatuses,
      responsible,
    };
    onFilter(filters);
  };

  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setDirection("");
    setSelectedStatuses([]);
    setResponsible("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filterForm}>
      <div className={styles.formGroup}>
        <label>Дата</label>
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
        <label>Направление</label>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        >
          <option value="">Выберите направление</option>
          <option value="Бесплатная заявка">Бесплатная заявка</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label>Статус сделки</label>
        <div className={styles.statusInputWrapper}>
          {selectedStatuses.map((status) => (
            <div className={styles.selectedStatus} key={status}>
              {status}
              <button
                type="button"
                onClick={() => handleRemoveStatus(status)}
                className={styles.removeStatusButton}
              >
                x
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            className={styles.addStatusButton}
          >
            + Добавить
          </button>
          {isStatusDropdownOpen && (
            <div className={styles.statusDropdown} ref={statusDropdownRef}>
              {availableStatuses.map((status) => (
                <div
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={styles.statusOption}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.formGroup}>
        <label>Ответственный</label>
        <div
          className={styles.statusInputWrapper}
          onClick={() =>
            setIsResponsibleDropdownOpen(!isResponsibleDropdownOpen)
          }
        >
          <div className={styles.statusInput}>{responsible}</div>
        </div>
        {isResponsibleDropdownOpen && (
          <div
            className={styles.responsibleDropdown}
            ref={responsibleDropdownRef}
          >
            <div className={styles.responsibleDropdownGrid}>
              {responsibleList.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setResponsible(item);
                    setIsResponsibleDropdownOpen(false);
                  }}
                  className={styles.responsibleOption}
                >
                  <div className={styles.responsibleOptionName}>
                    {item.split(" - ")[0]}
                  </div>
                  <div className={styles.responsibleOptionPosition}>
                    {item.split(" - ")[1]}
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
  );
};

export default FilterForm;
