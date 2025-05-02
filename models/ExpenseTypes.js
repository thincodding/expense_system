import { Schema, model, models } from "mongoose";

const expenseTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        note: {
            type: String,
            required: false,
        },
        userID: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const ExpenseType = models.expenseTypes || model("expenseTypes", expenseTypeSchema);

export default ExpenseType;
