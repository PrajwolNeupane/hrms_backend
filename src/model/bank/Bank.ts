import mongoose from "mongoose";

const BankModel = new mongoose.Schema({
  account_number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
});

const Bank = mongoose.model("Bank", BankModel);
export default Bank;
