import { Schema, model, models } from "mongoose";

const expenseSchema = new Schema(
  {
    expenseTypeId: {
      type: String,
      required: false,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    total: {
      type: Number,
      required: true,
    },
    payment_amount: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    currency_id: {
      type: String,
      required: false,
      trim: true,
    },
    bank_id: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    expense_date: {
      type: Date,
      required: false,
    },
    image_url: {
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

const Expense = models.expenses || model("expenses", expenseSchema);

export default Expense;
