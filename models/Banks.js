import { Schema, model, models } from "mongoose";

const bankSchema = new Schema(
  {
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    bankNumber: {
      type: String,
      required: true,
      trim: true,
    },
    bankTypeId: {
      type: String,
      required: false,
      trim: true,
    },
    amount: {
      type: Number,
    },
    status: {
      type: Number,
      default: 0, 
    },
    note: {
      type: String,
      required: false,
      trim: true,
    },
    userID: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Banks = models.banks || model("banks", bankSchema);

export default Banks;
