export const foodquestions = [
  {
    id: 1,
    text: 'Did you have your breakfast/lunch/dinner?',
    options: [
      {
        id: 1,
        text: 'Yes',
        next_question: 2,
      },
      {
        id: 2,
        text: 'No',
        next_question: 0,
      },
    ],
  },
  {
    id: 2,
    text: 'What is your carbohydrate source?',
    options: [
      {
        id: 1,
        text: 'Grains (rice, wheat, oats)',
        carbon_footprint: 0.04,
        next_question: 3,
      },
      {
        id: 2,
        text: 'Processed grains (bread, pasta)',
        carbon_footprint: 0.08,
        next_question: 3,
      },
      {
        id: 3,
        text: 'Do not contain carbohydrates',
        carbon_footprint: 0,
        next_question: 3,
      },
    ],
  },
  {
    id: 3,
    text: 'What is your protein source?',
    options: [
      { id: 1, text: 'Seafood', carbon_footprint: 0.25, next_question: 4 },
      {
        id: 2,
        text: 'Beef',
        carbon_footprint: 1.35,
        next_question: 4,
      },
      { id: 3, text: 'Chicken', carbon_footprint: 0.35, next_question: 4 },
      { id: 4, text: 'Pork', carbon_footprint: 0.75, next_question: 4 },
      {
        id: 5,
        text: ' Plant-based protein source (peas, beans, seeds)',
        carbon_footprint: 0.057,
        next_question: 4,
      },
      {
        id: 6,
        text: 'Do not contain protein',
        carbon_footprint: 0,
        next_question: 4,
      },
    ],
  },
  {
    id: 4,
    text: 'Did you have any fruits and vegetables?If so, What is the type of Fruits and vegetables you have?',
    options: [
      {
        id: 1,
        text: 'Local Fruits and vegetables',
        carbon_footprint: 0.025,
        next_question: 5,
      },
      {
        id: 2,
        text: 'Imported fruits and vegetables',
        carbon_footprint: 0.125,
        next_question: 5,
      },
      {
        id: 3,
        text: 'Do not contain fruits and vegetables',
        carbon_footprint: 0,
        next_question: 5,
      },
    ],
  },
  {
    id: 5,
    text: 'Did you have any beverages? If so, What is the beverage you have?',
    options: [
      { id: 1, text: 'Water', carbon_footprint: 0, next_question: 6 },
      {
        id: 2,
        text: 'Tea and Coffee',
        carbon_footprint: 1.5,
        next_question: 6,
      },
      { id: 3, text: 'Soda', carbon_footprint: 0.05, next_question: 6 },
      {
        id: 4,
        text: 'Do not contain beverage',
        carbon_footprint: 0,
        next_question: 6,
      },
    ],
  },
  {
    id: 6,
    text: 'What is the milk product you have with your beverage?',
    options: [
      {
        id: 1,
        text: 'Regular Milk',
        carbon_footprint: 0.12,
        next_question: 7,
      },
      {
        id: 2,
        text: ' Milk alternatives (Almond milk)',
        carbon_footprint: 0.015,
        next_question: 7,
      },
      {
        id: 3,
        text: 'Do not contain milk product',
        carbon_footprint: 0,
        next_question: 7,
      },
    ],
  },
  {
    id: 7,
    text: ' Did you have any snack or dessert in your meal? if so, What did you have? ',
    options: [
      { id: 1, text: 'Chips', carbon_footprint: 0.075, next_question: 0 },
      { id: 2, text: 'Cookies', carbon_footprint: 0.057, next_question: 0 },
      {
        id: 3,
        text: 'Cakes and pastries',
        carbon_footprint: 0.075,
        next_question: 0,
      },
      {
        id: 4,
        text: 'Do not eat any snack or dessert',
        carbon_footprint: 0,
        next_question: 0,
      },
    ],
  },
]
