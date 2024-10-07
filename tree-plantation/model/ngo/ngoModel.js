const ngoModel = {
  logo: "string", //Image Url
  name: "string", //String
  email: "string", //String
  password: "string", //Encrypted String
  phone: "string", //String
  address: "string",
  city: "string",
  state: "string",
  country: "string",
  postalCode: "number",
  description: "string",
  website: "string",
  placeIds: "array", //Array of Places under this NGO
  plantationStats: "array", //Array of Plantation Stats IDs
  //   createdAt: "", // auto added by database
  //   updatedAt: "", // auto added by database

  //*Collections:
  //Place
  //Plantation Stats
  //Payment Stats
  //Rewards
};

export { ngoModel };
