export const questions = [
  {
    id: 1,
    text: 'What kind of transportation do you use for today?',
    options: [
      { id: 1, text: 'Car', next_question: 2 },
      { id: 2, text: 'Bike', next_question: 3 },
      { id: 3, text: 'Public Transportation', next_question: 4 },
      { id: 4, text: 'Walking', next_question: 0 },
      { id: 5, text: 'Did not go out today', next_question: 0 },
    ],
  },
  {
    id: 2,
    text: 'What is the power source of your car?',
    options: [
      { id: 1, text: 'Gasoline', carbon_footprint: 0.231, next_question: 5 },
      { id: 2, text: 'Diesel', carbon_footprint: 0.375, next_question: 5 },
      { id: 3, text: 'Electric', carbon_footprint: 0.115, next_question: 5 },
      { id: 4, text: 'Hybrid', carbon_footprint: 0.15, next_question: 5 },
    ],
  },
  {
    id: 3,
    text: 'What is the power source of your motor bike?',
    options: [
      {
        id: 1,
        text: 'Gasoline fueled',
        carbon_footprint: 0.2,
        next_question: 5,
      },
      {
        id: 2,
        text: 'Electric fueled',
        carbon_footprint: 0.05,
        next_question: 5,
      },
    ],
  },
  {
    id: 4,
    text: 'What was the type of public transportation you used?',
    options: [
      { id: 1, text: 'BTS/ MRT', carbon_footprint: 0.05, next_question: 5 },
      {
        id: 2,
        text: 'Bus',
        carbon_footprint: 0.125,
        next_question: 5,
      },
    ],
  },
  {
    id: 5,
    text: 'How far was your commute?',
    options: [
      { id: 1, text: '10 KM', carbon_footprint: 10, next_question: 0 },
      {
        id: 2,
        text: '20 KM',
        carbon_footprint: 20,
        next_question: 0,
      },
      { id: 3, text: '30 KM', carbon_footprint: 30, next_question: 0 },
      { id: 4, text: '50 KM', carbon_footprint: 50, next_question: 0 },
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
  // {
  //   id: 7,
  //   text: 'How many miles do you drive per week?',
  //   options: [
  //     { id: 1, text: 'Less than 50', carbon_footprint: 1, next_question: 0 },
  //     { id: 2, text: '50-100', carbon_footprint: 2, next_question: 0 },
  //     { id: 3, text: 'More than 100', carbon_footprint: 3, next_question: 0 },
  //   ],
  // },
  // {
  //   id: 8,
  //   text: 'How far do you typically bike?',
  //   options: [
  //     {
  //       id: 1,
  //       text: 'Less than 5 miles',
  //       carbon_footprint: 0,
  //       next_question: 0,
  //     },
  //     { id: 2, text: '5-10 miles', carbon_footprint: 0 },
  //     {
  //       id: 3,
  //       text: 'More than 10 miles',
  //       carbon_footprint: 0,
  //       next_question: 0,
  //     },
  //   ],
  // },
  // {
  //   id: 9,
  //   text: 'How many miles do you use public transportation? ',
  //   options: [
  //     { id: 1, text: 'Over 10', carbon_footprint: 3, next_question: 0 },
  //     { id: 2, text: 'Less than 10', carbon_footprint: 2, next_question: 0 },
  //     { id: 3, text: 'Less than 5', carbon_footprint: 1, next_question: 0 },
  //   ],
  // },
  // {
  //   id: 10,
  //   text: 'How far do you typically walk?',
  //   options: [
  //     {
  //       id: 1,
  //       text: 'Less than 5 miles',
  //       carbon_footprint: 2,
  //       next_question: 0,
  //     },
  //     { id: 2, text: '5-10 miles', carbon_footprint: 1 },
  //     {
  //       id: 3,
  //       text: 'More than 10 miles',
  //       carbon_footprint: 1,
  //       next_question: 0,
  //     },
  //   ],
  // },
]
