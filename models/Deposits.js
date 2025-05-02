import { Schema, model, models } from "mongoose";

const depositSchema = new Schema(
    {
        bank_id: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: false,
        },
        currency_id: {
            type: String,
            required: false,
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

const Deposits = models.deposits || model("deposits", depositSchema);

export default Deposits;
