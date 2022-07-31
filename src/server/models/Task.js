import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    text: String,
    category: "All" | "Home" | "Work" | "School",
    isDone: Boolean
})
const model = mongoose.model('Task', TaskSchema);
export default model;