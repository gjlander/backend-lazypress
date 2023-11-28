import { Schema } from "mongoose";

const ingListSchema = new Schema({
    ing: String,
    amount: String,
});

export default ingListSchema;
