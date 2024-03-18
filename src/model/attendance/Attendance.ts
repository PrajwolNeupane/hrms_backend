import mongoose from "mongoose";

const AttendanceModel = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    clockIn: {
        type: String,
        required: true
    },
    clockOut: {
        type: String
    }
})

const Attendance = mongoose.model("Attedance", AttendanceModel);
export default Attendance;
