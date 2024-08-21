const applies = {
    "data": [
      {
        "ID": 1,
        "UF_COMMENT": "Перегорела лампочка на этаже",
        "DATE_CREATE": "2024-10-10 10:00:00",
        "CATEGORY": {
          "ID": 12,
          "NAME": "Бесплатные заявки", 
          "BACKGROUND": "#FFC107", 
          "COLOR": "#FFFFFF"
        },
        "STAGE": {
          "ID": "C12:NEW",
          "NAME": "Новая заявка", 
          "COLOR": "#2FC6F6"
        },
        "CONTACT": {
          "ID": 12,
          "NAME": "Пирогов Семен Петрович", 
          "PHONE": "79251234567"
        },
        "ASSIGNED_BY": {
          "ID": 12,
          "NAME": "Пирогов Семен Петрович"
        }
      },
      {
        "ID": 2,
        "UF_COMMENT": "Требуется замена крана в ванной",
        "DATE_CREATE": "2024-10-11 14:30:00",
        "CATEGORY": {
          "ID": 13,
          "NAME": "Платные заявки", 
          "BACKGROUND": "#4CAF50", 
          "COLOR": "#FFFFFF"
        },
        "STAGE": {
          "ID": "C13:IN_PROGRESS",
          "NAME": "В процессе", 
          "COLOR": "#FFC107"
        },
        "CONTACT": {
          "ID": 15,
          "NAME": "Иванов Иван Иванович", 
          "PHONE": "79257654321"
        },
        "ASSIGNED_BY": {
          "ID": 16,
          "NAME": "Сидоров Павел Николаевич"
        }
      },
      {
        "ID": 3,
        "UF_COMMENT": "Необходимо починить дверь в подъезд",
        "DATE_CREATE": "2024-10-12 09:45:00",
        "CATEGORY": {
          "ID": 14,
          "NAME": "Срочные заявки", 
          "BACKGROUND": "#F44336", 
          "COLOR": "#FFFFFF"
        },
        "STAGE": {
          "ID": "C14:COMPLETED",
          "NAME": "Завершена", 
          "COLOR": "#4CAF50"
        },
        "CONTACT": {
          "ID": 17,
          "NAME": "Кузнецов Сергей Александрович", 
          "PHONE": "79253456789"
        },
        "ASSIGNED_BY": {
          "ID": 18,
          "NAME": "Ковалев Николай Петрович"
        }
      }
    ]
  }
  
export default applies;