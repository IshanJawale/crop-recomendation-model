const plantationModel = {
  treesPlanted: "number", //Number
  orderQuantity: "number", //Number
  placeId: "string", //String (Place ID) if any
  plantedBy: "string", //String (user/ngo)
  status: "string", //String (status)
  trees: "array", //Array of treeModel
  //Only one out of following fidlds will be present
  ngoId: "string", //String (NGO ID) if any
  campaignId: "string", //String (Campaign ID) if any
  //**//
};

const treeModel = {
  treeName: "string", //String
  treeType: "string", //String
  plantationDate: "number", //Number
};

export { plantationModel, treeModel };
