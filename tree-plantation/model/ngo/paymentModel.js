const paymentModel = {
  transactionId: "string", //String
  amount: "number", //Number
  description: "string", //String
  paymentDate: "timestamp", //Date
  paymentMode: "string", //String
  paymentStatus: "string", //String
  campaignId: "string", //String (Campaign ID) if any
  //Only one out of following fidlds will be present
  userId: "string", //String (User ID) if any
  fromApp: "boolean", //Boolean (true if payment is from app)
  //**//
};

export { paymentModel };
