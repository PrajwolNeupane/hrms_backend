import mongoose from "mongoose";

const RoleModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date_joined: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model("Role", RoleModel);
export default Role;
