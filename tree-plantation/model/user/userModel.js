const userModel = {
  avatar: "string", //Image link
  name: "string", //String
  email: "string", //String
  phone: "string", //String
  role: "string", //String
  locality: "geopoint", //GeoPoint
  isVerified: "boolean`", //Boolean
  treesPlanted: "number", //Number
  ngoId: "string", //String (NGO ID) if user role is volunteer
  dob: "timestamp", //Timestamp
  //Rewards
  level: "string", //String
  badge: "string", //String
  points: "number", //Number
  rewards: "array", //Array of rewardModel
  //   createdAt: "", // auto added by database
  //   updatedAt: "", // auto added by database

  //*Collections:
  //Plantation Stats
  //Payment Stats
  //Reward Model
};

export { userModel };
