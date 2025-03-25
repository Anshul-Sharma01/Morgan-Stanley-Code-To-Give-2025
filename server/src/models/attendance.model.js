import mongoose, { Schema } from "mongoose";


const attendanceSchema = new Schema({
    studentId : {
        type : Schema.Types.ObjectId,
        ref : "Student"
    },
    educatorId : {
        type : Schema.Types.ObjectId,
        ref : "Employee"
    },
    report : [
        {
            month : {
                type : String,
                enum : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            status : [
                {
                    type : "String",
                    enum : ["P", "A", "$"],
                    default : "$"
                }
            ]
        }
    ]
},{
    timestamps : true
})
// in the report section this would be an array of objects where each object would depict the month and an another array of strings where the attendance would be marked acc to the day ( 0 - based indexing)


export const attendance = mongoose.model("Attendance", attendanceSchema);


