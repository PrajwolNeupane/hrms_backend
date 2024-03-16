import mongoose from "mongoose";

const EmployeeModel = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bank",
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  salary: {
    type: Number,
    required: true,
    default: 0,
  },
  pan_number: {
    type: String,
    required: false,
  },
  date_joined: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Employee = mongoose.model("Employee", EmployeeModel);
export default Employee;
