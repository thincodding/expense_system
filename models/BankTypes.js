import { Schema, model, models } from "mongoose";

const bankTypeSchema = new Schema(
    {
        bankTypeName: {
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

const BankTypes = models.bankTypes || model("bankTypes", bankTypeSchema);

export default BankTypes;
