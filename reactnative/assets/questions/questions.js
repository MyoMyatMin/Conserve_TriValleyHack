export const questions = [
  {
    id: 1,
    text: 'What kind of transportation do you use most often?',
    options: [
      { id: 1, text: 'Car', next_question: 2 },
      { id: 2, text: 'Bike', next_question: 3 },
      { id: 3, text: 'Public Transportation', next_question: 4 },
      { id: 4, text: 'Walking', next_question: 5 },
      // { id: 5, text: 'Other', next_question: 6 },
    ],
  },
  {
    id: 2,
    text: 'What type of car do you drive?',
    options: [
      { id: 1, text: 'Gasoline', carbon_footprint: 3, next_question: 7 },
      { id: 2, text: 'Hybrid', carbon_footprint: 2, next_question: 7 },
      { id: 3, text: 'Electric', carbon_footprint: 1, next_question: 7 },
    ],
  },
  {
    id: 3,
    text: 'How often do you bike?',
    options: [
      { id: 1, text: 'Daily', carbon_footprint: 3, next_question: 8 },
      {
        id: 2,
        text: 'Several times a week',
        carbon_footprint: 0,
        next_question: 8,
      },
      { id: 3, text: 'Rarely', carbon_footprint: 0, next_question: 8 },
    ],
  },
  {
    id: 4,
    text: 'How often do you use public transportation?',
    options: [
      { id: 1, text: 'Daily', carbon_footprint: 1, next_question: 9 },
      {
        id: 2,
        text: 'Several times a week',
        carbon_footprint: 1,
        next_question: 9,
      },
      { id: 3, text: 'Rarely', carbon_footprint: 1, next_question: 9 },
    ],
  },
  {
    id: 5,
    text: 'How often do you walk?',
    options: [
      { id: 1, text: 'Daily', carbon_footprint: 0, next_question: 10 },
      {
        id: 2,
        text: 'Several times a week',
        carbon_footprint: 0,
        next_question: 10,
      },
      { id: 3, text: 'Rarely', carbon_footprint: 0, next_question: 10 },
    ],
  },
  // {
  //   id: 6,
  //   text: 'Please specify your other mode of transportation',
  //   options: [
  //     { id: 1, text: 'Motorcycle', carbon_footprint: 2, next_question: 11 },
  //     { id: 2, text: 'Scooter', carbon_footprint: 1, next_question: 11 },
  //     { id: 3, text: 'Other', carbon_footprint: 0, next_question: 11 },
  //   ],
  // },
  {
    id: 7,
    text: 'How many miles do you drive per week?',
    options: [
      { id: 1, text: 'Less than 50', carbon_footprint: 1, next_question: 0 },
      { id: 2, text: '50-100', carbon_footprint: 2, next_question: 0 },
      { id: 3, text: 'More than 100', carbon_footprint: 3, next_question: 0 },
    ],
  },
  {
    id: 8,
    text: 'How far do you typically bike?',
    options: [
      {
        id: 1,
        text: 'Less than 5 miles',
        carbon_footprint: 0,
        next_question: 0,
      },
      { id: 2, text: '5-10 miles', carbon_footprint: 0 },
      {
        id: 3,
        text: 'More than 10 miles',
        carbon_footprint: 0,
        next_question: 0,
      },
    ],
  },
  {
    id: 9,
    text: 'How many miles do you use public transportation? ',
    options: [
      { id: 1, text: 'Over 10', carbon_footprint: 3, next_question: 0 },
      { id: 2, text: 'Less than 10', carbon_footprint: 2, next_question: 0 },
      { id: 3, text: 'Less than 5', carbon_footprint: 1, next_question: 0 },
    ],
  },
  {
    id: 10,
    text: 'How far do you typically walk?',
    options: [
      {
        id: 1,
        text: 'Less than 5 miles',
        carbon_footprint: 2,
        next_question: 0,
      },
      { id: 2, text: '5-10 miles', carbon_footprint: 1 },
      {
        id: 3,
        text: 'More than 10 miles',
        carbon_footprint: 1,
        next_question: 0,
      },
    ],
  },
]
