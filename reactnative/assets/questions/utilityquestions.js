export const utilityquestions = [
  {
    id: 1,
    text: "Did you use any new plastic bag today? If so, How many?",
    options: [
      { id: 1, text: "One", carbon_footprint: 0.0085, next_question: 2 },
      { id: 2, text: "Two", carbon_footprint: 0.017, next_question: 2 },
      { id: 3, text: "Three", carbon_footprint: 0.0255, next_question: 2 },
      {
        id: 4,
        text: "More than three",
        carbon_footprint: 0.425,
        next_question: 2,
      },
      {
        id: 5,
        text: "Did not use any bag",
        carbon_footprint: 0,
        next_question: 2,
      },
    ],
  },
  {
    id: 2,
    text: "Did you buy any new plastic water bottles/cans today? If so, How many?",
    options: [
      { id: 1, text: "One", carbon_footprint: 0.14, next_question: 0 },
      { id: 2, text: "Two", carbon_footprint: 0.28, next_question: 0 },
      { id: 3, text: "Three", carbon_footprint: 0.42, next_question: 0 },
      {
        id: 4,
        text: "More than three",
        carbon_footprint: 0.7,
        next_question: 0,
      },
      {
        id: 5,
        text: "Did not buy any bottle/can",
        carbon_footprint: 0,
        next_question: 0,
      },
    ],
  },

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
];
