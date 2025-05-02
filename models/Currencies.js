import { Schema, model, models } from "mongoose";

const currencyTypeSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
        exchange_rate: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const Currencies = models.currencies || model("currencies", currencyTypeSchema);

export default Currencies;
