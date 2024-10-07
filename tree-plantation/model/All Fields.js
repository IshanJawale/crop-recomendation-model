//! This file contains all the fields required for all the models
//! NOT TO BE USED IN CODE
const ngoFields = {
  //NGO Model
  name: "string", //String
  email: "string", //String
  password: "string", //Encrypted String
  phone: "string", //String
  address: "string",
  city: "string",
  state: "string",
  country: "string",
  postalCode: "number",
  places: "array", //Array of Places under this NGO
  plantationIds: "array", //Array of Plantation Stats IDs
  description: "string",
  website: "string",
  logo: "string", //Image Url

  //Payment Details
  transactionId: "", //String
  amount: "", //Number
  description: "", //String
  paymentDate: "", //Date
  paymentMode: "", //String
  paymentStatus: "", //String
  campaignId: "", //String (Campaign ID) if any
  //Only one out of following fidlds will be present
  userId: "", //String (User ID) if any
  fromApp: "", //Boolean (true if payment is from app)
};

let ngoModel;
let paymentModel;

const userFields = {
  //Payment Details
  transactionId: "", // String
  userId: "", // String
  beneficiaryId: "", // String
  amount: "", // Number
  date: "", // Date
  status: "", // String

  //Rewards
  level: "", //String
  badge: "", //String
  points: "", //Number
  rewards: [
    //Array of Objects
    {
      plantationId: "", //String
      treesPlanted: "", //Number
      images: [], //Array of Strings (Image links)
      date: "", //Date
      ngoId: "", //String
      isCampaign: "", //Boolean
      campaignId: "", //String (If isCampaign is true)
    },
  ],

  //User Fields
  avatar: "", //Image link
  name: "", //String
  email: "", //String
  password: "", //Encrypted String
  phone: "", //String
  role: "", //String
  locality: [], //Array of Strings (Lat, Long)
  isVerified: "", //Boolean
  plantationIds: [], //Array of Strings (Plantation Ids)
  ngoId: "", //String (NGO ID) if user role is volunteer

  //
  logo: "", // Image URL
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  status: "",
  ngoIds: [], // Array of NGO ID
  placeIds: [], // Array of Place ID
  plantationIds: [], // Array of Plantation ID
  photos: [], //Array of Image URL

  //
  address: "",
  description: "",
  coordinates: "", //(Lat, Long)
  images: [],
  caretaker: {
    name: "",
    contact: "",
  },
  ngoIds: [],
};
