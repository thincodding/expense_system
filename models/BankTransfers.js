import { Schema, model, models } from "mongoose";

const bankTransferSchema = new Schema(
    {
        bank_id_from: {
            type: String,
            required: true,
        },
        bank_id_to: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
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

const BankTransfers = models.bankTransfer || model("bankTransfer", bankTransferSchema);

export default BankTransfers;
