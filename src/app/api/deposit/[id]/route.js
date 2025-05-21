import { NextResponse } from "next/server";
import connectDB from "../../../config/config";
import Deposit from "../../../../../models/Deposits";
import Bank from "../../../../../models/Banks";
import mongoose from "mongoose";




export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid deposit ID." }, { status: 400 });
    }

    // Find the deposit by deposit ID
    const deposit = await Deposit.findById(id);
    if (!deposit) {
      return NextResponse.json({ error: "Deposit not found." }, { status: 404 });
    }

    const bankId = deposit.bank_id;

    if (!bankId || !mongoose.Types.ObjectId.isValid(bankId)) {
      return NextResponse.json(
        { error: "Invalid or missing bank_id in deposit." },
        { status: 400 }
      );
    }

    // Find the bank by deposit.bank_id
    const bank = await Bank.findById(bankId);
    if (!bank) {
      return NextResponse.json({ error: "Associated bank not found." }, { status: 404 });
    }

    // Decrease bank amount by deposit amount
    bank.amount = (bank.amount || 0) - deposit.amount;
    if (bank.amount < 0) bank.amount = 0;

    await bank.save();

    // Delete the deposit
    await Deposit.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deposit deleted and bank amount updated." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting deposit:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}