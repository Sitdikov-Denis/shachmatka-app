"use client";
import React from "react";
import styles from "./ApplyCard.module.css"; // Стили для компонента

interface Category {
  ID: number;
  NAME: string;
  BACKGROUND: string;
  COLOR: string;
}

interface Stage {
  ID: string;
  NAME: string;
  COLOR: string;
}

interface Contact {
  ID: number;
  NAME: string;
  PHONE: string;
}

interface AssignedBy {
  ID: number;
  NAME: string;
}

interface Apply {
  ID: number;
  UF_COMMENT: string;
  DATE_CREATE: string;
  CATEGORY: Category;
  STAGE: Stage;
  CONTACT: Contact;
  ASSIGNED_BY: AssignedBy;
}

interface LocationInfo {
  houseNumber: string;
  approachNumber: string;
  floorNumber: string;
  premiseNumber: string;
}

interface ApplyCardProps {
  apply: Apply;
  location: LocationInfo;
}

const ApplyCard: React.FC<ApplyCardProps> = ({ apply, location }) => {
  const formattedDate = new Date(apply.DATE_CREATE).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.card}>

      <div
        className={styles.header}
        style={{
          backgroundColor: apply.CATEGORY.BACKGROUND,
          color: apply.CATEGORY.COLOR,
        }}
      >
        {apply.CATEGORY.NAME}
        <span
          className={styles.status}
          style={{ backgroundColor: apply.STAGE.COLOR }}
        >
          {apply.STAGE.NAME}
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.date}>{formattedDate}</div>
        <div className={styles.comment}>{apply.UF_COMMENT}</div>
        <div className={styles.contact}>
        <span className={styles.contactName}>Контакт:</span> <span className={styles.contactName}>{apply.CONTACT.NAME}</span>{" "}
          <a href={`tel:${apply.CONTACT.PHONE}`} className={styles.contactNumber}>
            {apply.CONTACT.PHONE.replace(
              /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
              "+$1 $2 $3-$4-$5"
            )}
          </a>
        </div>
        <div className={styles.assigned}>
        <span className={styles.contactName}>Менеджер B24:</span>{" "}
          <span className={styles.managerName}>{apply.ASSIGNED_BY.NAME}</span>
        </div>
      </div>
    </div>
  );
};

export default ApplyCard;
