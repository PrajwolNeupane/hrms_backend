import mongoose from "mongoose";

const TokenModel = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expire_date: {
    type: String,
    required: true,
  },
  valid_email: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model("Token", TokenModel);
export default Token;
