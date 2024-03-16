import mongoose from "mongoose";

const AdminModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  photo: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", AdminModel);
export default Admin;

