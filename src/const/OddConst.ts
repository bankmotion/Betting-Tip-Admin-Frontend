export const BetType = [
  {
    id: 0,
    name: "Match Result (1X2)",
    bias: [
      { oddsMin: 1.2, oddsMax: 1.29, bias: -0.15 },
      { oddsMin: 1.3, oddsMax: 1.49, bias: -0.12 },
      { oddsMin: 1.5, oddsMax: 1.7, bias: -0.08 },
      { oddsMin: 1.71, oddsMax: 2.5, bias: -0.05 },
      { oddsMin: 2.51, oddsMax: 4.0, bias: -0.03 },
      { oddsMin: 4.01, oddsMax: 10.0, bias: 0.0 },
    ],
    subTypes: [
      {
        subId: 0,
        name: "Home Winner",
        keyId: 1,
        key: "Home",
      },
      {
        subId: 1,
        name: "Draw",
        keyId: 1,
        key: "Draw",
      },
      {
        subId: 2,
        name: "Away Winner",
        keyId: 1,
        key: "Away",
      },
    ],
  },
  {
    id: 1,
    name: "Double Chance (1X, 12, X2)",
    bias: [
      { oddsMin: 1.1, oddsMax: 1.29, bias: -0.12 },
      { oddsMin: 1.3, oddsMax: 1.5, bias: -0.08 },
    ],
    subTypes: [
      {
        subId: 0,
        name: "Home/Draw",
        keyId: 2,
        key: "Home/Draw",
      },
      {
        subId: 1,
        name: "Home/Away",
        keyId: 2,
        key: "Home/Away",
      },
      {
        subId: 2,
        name: "Draw/Away",
        keyId: 2,
        key: "Draw/Away",
      },
    ],
  },
  {
    id: 2,
    name: "Over/Under Total Goals",
    bias: [
      { oddsMin: 1.3, oddsMax: 1.6, bias: -0.1 },
      { oddsMin: 1.61, oddsMax: 2.5, bias: -0.05 },
      { oddsMin: 2.51, oddsMax: 4.0, bias: -0.02 },
    ],
    subTypes: [
      {
        subId: 0,
        name: "Over 1.5",
        keyId: 5,
        key: "Over 1.5",
      },
      {
        subId: 1,
        name: "Under 1.5",
        keyId: 5,
        key: "Under 1.5",
      },
      {
        subId: 2,
        name: "Over 2.5",
        keyId: 5,
        key: "Over 2.5",
      },
      {
        subId: 3,
        name: "Under 2.5",
        keyId: 5,
        key: "Under 2.5",
      },
      {
        subId: 4,
        name: "Over 3.5",
        keyId: 5,
        key: "Over 3.5",
      },
      {
        subId: 5,
        name: "Under 3.5",
        keyId: 5,
        key: "Under 3.5",
      },
      {
        subId: 6,
        name: "Over 4.5",
        keyId: 5,
        key: "Over 4.5",
      },
      {
        subId: 7,
        name: "Under 4.5",
        keyId: 5,
        key: "Under 4.5",
      },
    ],
  },
  {
    id: 3,
    name: "Both Teams Score to Score (BTTS)",
    bias: [
      { oddsMin: 1.5, oddsMax: 2.5, bias: -0.1 },
      { oddsMin: 2.51, oddsMax: 4, bias: -0.04 },
      { oddsMin: 4.01, oddsMax: 10.0, bias: 0 },
    ],
    subTypes: [
      {
        subId: 0,
        name: "Yes",
        keyId: 8,
        key: "Yes",
      },
      {
        subId: 1,
        name: "No",
        keyId: 8,
        key: "No",
      },
    ],
  },
  {
    id: 4,
    name: "Team Total Goals",
    bias: [
      { oddsMin: 1.4, oddsMax: 2, bias: -0.07 },
      { oddsMin: 2.01, oddsMax: 3.5, bias: -0.03 },
    ],
    subTypes: [
      {
        subId: 0,
        name: "Over 1.5 Home",
        keyId: 16,
        key: "Over 1.5",
      },
      {
        subId: 1,
        name: "Over 1.5 Away",
        keyId: 17,
        key: "Over 1.5",
      },
    ],
  },
  {
    id: 5,
    name: "Handicap Result",
    bias: [
      { oddsMin: 1.6, oddsMax: 2.5, bias: -0.06 },
      { oddsMin: 2.51, oddsMax: 4, bias: -0.02 },
    ],
    subTypes: [
      {
        subId: 0,
        name: "Home -1.5",
        keyId: 4,
        key: "Home -1.5",
      },
      {
        subId: 1,
        name: "Away -1.5",
        keyId: 4,
        key: "Away -1.5",
      },
    ],
  },
  {
    id: 6,
    name: "Goals in Both Halves",
    bias: [
      { oddsMin: 2, oddsMax: 3, bias: -0.06 },
      { oddsMin: 3.01, oddsMax: 5, bias: -0.03 },
      { oddsMin: 5.01, oddsMax: 10.0, bias: 0 },
    ],
    subTypes: [
      {
        subId: 0,
        name: "Yes",
        keyId: 113,
        key: "Yes",
      },
      {
        subId: 1,
        name: "No",
        keyId: 113,
        key: "No",
      },
    ],
  },
  {
    id: 7,
    name: "Half Time Full Time",
    bias: [
      { oddsMin: 3, oddsMax: 6, bias: -0.02 },
      { oddsMin: 6.01, oddsMax: 10.0, bias: 0 },
    ],
    subTypes: [
      {
        subId: 0,
        name: "Home/Home",
        keyId: 7,
        key: "Home/Home",
      },
      {
        subId: 1,
        name: "Away/Away",
        keyId: 7,
        key: "Away/Away",
      },
    ],
  },
];
