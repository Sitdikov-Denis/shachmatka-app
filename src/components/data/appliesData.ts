const appliesData = {
  "UF_COMPLEX_ID": 1,
  "UF_HOUSES": [
    {
      "UF_HOUSE_ID": 1,
      "UF_APPROACHES": [
        {
          "UF_APPROACHE_ID": 1,
          "UF_FLOORS": [
            {
              "UF_FLOOR_ID": 1,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 1,
                  "DEALS": [
                    {
                      "CATEGORY_ID": 1,
                      "TITLE": "Ремонт дверной ручки",
                      "TYPE_ID": "repair",
                      "DATE_CREATE_from": "2024-08-01",
                      "DATE_CREATE_to": "2024-08-02",
                      "STAGE_ID": "new",
                      "CONTACT_ID": 111,
                      "ASSIGNED_BY_ID": 101,
                      "DEADLINE_from": "2024-08-05",
                      "DEADLINE_to": "2024-08-10",
                      "STATE": "Ждет выполнения"
                    },
                    {
                      "CATEGORY_ID": 2,
                      "TITLE": "Замена светильника в прихожей",
                      "TYPE_ID": "maintenance",
                      "DATE_CREATE_from": "2024-08-03",
                      "DATE_CREATE_to": "2024-08-03",
                      "STAGE_ID": "completed",
                      "CONTACT_ID": 112,
                      "ASSIGNED_BY_ID": 102,
                      "DEADLINE_from": "2024-08-07",
                      "DEADLINE_to": "2024-08-07",
                      "STATE": "Ждет выполнения"
                    }
                  ]
                },
                {
                  "UF_PREMISE_ID": 2,
                  "DEALS": [
                    {
                      "CATEGORY_ID": 3,
                      "TITLE": "Уборка общего коридора",
                      "TYPE_ID": "cleaning",
                      "DATE_CREATE_from": "2024-07-20",
                      "DATE_CREATE_to": "2024-07-20",
                      "STAGE_ID": "in_progress",
                      "CONTACT_ID": 113,
                      "ASSIGNED_BY_ID": 103,
                      "DEADLINE_from": "2024-07-21",
                      "DEADLINE_to": "2024-07-22",
                      "STATE": "NEW"
                    },
                    {
                      "CATEGORY_ID": 4,
                      "TITLE": "Починка трубопровода",
                      "TYPE_ID": "repair",
                      "DATE_CREATE_from": "2024-08-01",
                      "DATE_CREATE_to": "2024-08-01",
                      "STAGE_ID": "new",
                      "CONTACT_ID": 114,
                      "ASSIGNED_BY_ID": 104,
                      "DEADLINE_from": "2024-08-10",
                      "DEADLINE_to": "2024-08-15",
                      "STATE": "OVERDUE"
                    }
                  ]
                },
                {
                  "UF_PREMISE_ID": 3,
                  "DEALS": [
                    {
                      "CATEGORY_ID": 5,
                      "TITLE": "Замена фильтров вентиляции",
                      "TYPE_ID": "maintenance",
                      "DATE_CREATE_from": "2024-07-25",
                      "DATE_CREATE_to": "2024-07-26",
                      "STAGE_ID": "completed",
                      "CONTACT_ID": 111,
                      "ASSIGNED_BY_ID": 101,
                      "DEADLINE_from": "2024-07-30",
                      "DEADLINE_to": "2024-08-01",
                      "STATE": "NEW"
                    },
                    {
                      "CATEGORY_ID": 6,
                      "TITLE": "Покраска стен в коридоре",
                      "TYPE_ID": "maintenance",
                      "DATE_CREATE_from": "2024-08-02",
                      "DATE_CREATE_to": "2024-08-04",
                      "STAGE_ID": "new",
                      "CONTACT_ID": 112,
                      "ASSIGNED_BY_ID": 102,
                      "DEADLINE_from": "2024-08-06",
                      "DEADLINE_to": "2024-08-08",
                      "STATE": "NEW"
                    }
                  ]
                },
                {
                  "UF_PREMISE_ID": 4,
                  "DEALS": [
                    {
                      "CATEGORY_ID": 7,
                      "TITLE": "Установка новых дверей",
                      "TYPE_ID": "installation",
                      "DATE_CREATE_from": "2024-08-05",
                      "DATE_CREATE_to": "2024-08-06",
                      "STAGE_ID": "in_progress",
                      "CONTACT_ID": 113,
                      "ASSIGNED_BY_ID": 103,
                      "DEADLINE_from": "2024-08-12",
                      "DEADLINE_to": "2024-08-14",
                      "STATE": "NEW"
                    },
                    {
                      "CATEGORY_ID": 8,
                      "TITLE": "Починка замка входной двери",
                      "TYPE_ID": "repair",
                      "DATE_CREATE_from": "2024-08-07",
                      "DATE_CREATE_to": "2024-08-07",
                      "STAGE_ID": "new",
                      "CONTACT_ID": 114,
                      "ASSIGNED_BY_ID": 104,
                      "DEADLINE_from": "2024-08-10",
                      "DEADLINE_to": "2024-08-12",
                      "STATE": "NEW"
                    }
                  ]
                }
              ]
            },
            // Второй этаж
            {
              "UF_FLOOR_ID": 2,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 5,
                  "DEALS": [
                    {
                      "CATEGORY_ID": 3,
                      "TITLE": "Чистка вентиляции",
                      "TYPE_ID": "cleaning",
                      "DATE_CREATE_from": "2024-07-20",
                      "DATE_CREATE_to": "2024-07-20",
                      "STAGE_ID": "in_progress",
                      "CONTACT_ID": 113,
                      "ASSIGNED_BY_ID": 103,
                      "DEADLINE_from": "2024-07-21",
                      "DEADLINE_to": "2024-07-22",
                      "STATE": "NEW"
                    },
                    {
                      "CATEGORY_ID": 4,
                      "TITLE": "Ремонт труб",
                      "TYPE_ID": "repair",
                      "DATE_CREATE_from": "2024-08-01",
                      "DATE_CREATE_to": "2024-08-01",
                      "STAGE_ID": "new",
                      "CONTACT_ID": 114,
                      "ASSIGNED_BY_ID": 104,
                      "DEADLINE_from": "2024-08-10",
                      "DEADLINE_to": "2024-08-15",
                      "STATE": "OVERDUE"
                    }
                  ]
                },
                {
                  "UF_PREMISE_ID": 6,
                  "DEALS": [
                    {
                      "CATEGORY_ID": 5,
                      "TITLE": "Замена воздушных фильтров",
                      "TYPE_ID": "maintenance",
                      "DATE_CREATE_from": "2024-07-25",
                      "DATE_CREATE_to": "2024-07-26",
                      "STAGE_ID": "completed",
                      "CONTACT_ID": 111,
                      "ASSIGNED_BY_ID": 101,
                      "DEADLINE_from": "2024-07-30",
                      "DEADLINE_to": "2024-08-01",
                      "STATE": "NEW"
                    },
                    {
                      "CATEGORY_ID": 6,
                      "TITLE": "Покраска стен",
                      "TYPE_ID": "maintenance",
                      "DATE_CREATE_from": "2024-08-02",
                      "DATE_CREATE_to": "2024-08-04",
                      "STAGE_ID": "new",
                      "CONTACT_ID": 112,
                      "ASSIGNED_BY_ID": 102,
                      "DEADLINE_from": "2024-08-06",
                      "DEADLINE_to": "2024-08-08",
                      "STATE": "NEW"
                    }
                  ]
                },
                {
                  "UF_PREMISE_ID": 7,
                  "DEALS": [
                    {
                      "CATEGORY_ID": 7,
                      "TITLE": "Установка дверных замков",
                      "TYPE_ID": "installation",
                      "DATE_CREATE_from": "2024-08-05",
                      "DATE_CREATE_to": "2024-08-06",
                      "STAGE_ID": "in_progress",
                      "CONTACT_ID": 113,
                      "ASSIGNED_BY_ID": 103,
                      "DEADLINE_from": "2024-08-12",
                      "DEADLINE_to": "2024-08-14",
                      "STATE": "NEW"
                    },
                    {
                      "CATEGORY_ID": 8,
                      "TITLE": "Ремонт входных дверей",
                      "TYPE_ID": "repair",
                      "DATE_CREATE_from": "2024-08-07",
                      "DATE_CREATE_to": "2024-08-07",
                      "STAGE_ID": "new",
                      "CONTACT_ID": 114,
                      "ASSIGNED_BY_ID": 104,
                      "DEADLINE_from": "2024-08-10",
                      "DEADLINE_to": "2024-08-12",
                      "STATE": "NEW"
                    }
                  ]
                },
                {
                  "UF_PREMISE_ID": 8,
                  "DEALS": [
                    {
                      "CATEGORY_ID": 9,
                      "TITLE": "Обслуживание кондиционеров",
                      "TYPE_ID": "maintenance",
                      "DATE_CREATE_from": "2024-08-10",
                      "DATE_CREATE_to": "2024-08-11",
                      "STAGE_ID": "new",
                      "CONTACT_ID": 111,
                      "ASSIGNED_BY_ID": 101,
                      "DEADLINE_from": "2024-08-15",
                      "DEADLINE_to": "2024-08-17",
                      "STATE": "NEW"
                    },
                    {
                      "CATEGORY_ID": 10,
                      "TITLE": "Ремонт крыши",
                      "TYPE_ID": "repair",
                      "DATE_CREATE_from": "2024-08-12",
                      "DATE_CREATE_to": "2024-08-13",
                      "STAGE_ID": "in_progress",
                      "CONTACT_ID": 112,
                      "ASSIGNED_BY_ID": 102,
                      "DEADLINE_from": "2024-08-18",
                      "DEADLINE_to": "2024-08-20",
                      "STATE": "OVERDUE"
                    }
                  ]
                }
              ]
            },
            // Третий этаж
            {
              "UF_FLOOR_ID": 3,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 9,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 10,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 11,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 12,
                  "DEALS": []
                }
              ]
            },
            // Четвертый этаж
            {
              "UF_FLOOR_ID": 4,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 13,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 14,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 15,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 16,
                  "DEALS": []
                }
              ]
            },
            // Пятый этаж
            {
              "UF_FLOOR_ID": 5,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 17,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 18,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 19,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 20,
                  "DEALS": []
                }
              ]
            },
            // Шестой этаж
            {
              "UF_FLOOR_ID": 6,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 21,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 22,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 23,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 24,
                  "DEALS": []
                }
              ]
            },
            // Седьмой этаж
            {
              "UF_FLOOR_ID": 7,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 25,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 26,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 27,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 28,
                  "DEALS": []
                }
              ]
            },
            // Восьмой этаж
            {
              "UF_FLOOR_ID": 8,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 29,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 30,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 31,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 32,
                  "DEALS": []
                }
              ]
            },
            // Девятый этаж
            {
              "UF_FLOOR_ID": 9,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 33,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 34,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 35,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 36,
                  "DEALS": []
                }
              ]
            },
            // Десятый этаж
            {
              "UF_FLOOR_ID": 10,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 37,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 38,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 39,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 40,
                  "DEALS": []
                }
              ]
            },
            // Одиннадцатый этаж
            {
              "UF_FLOOR_ID": 11,
              "UF_PREMISES": [
                {
                  "UF_PREMISE_ID": 41,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 42,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 43,
                  "DEALS": []
                },
                {
                  "UF_PREMISE_ID": 44,
                  "DEALS": []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export default appliesData;
