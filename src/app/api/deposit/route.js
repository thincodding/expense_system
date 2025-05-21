"use server";

import { NextResponse } from "next/server";
import connectDB from "../../config/config";
import Deposit from "../../../../models/Deposits";
import { usePagination } from "../../composable/usePagination";
import Bank from "../../../../models/Banks";

export async function GET(req) {

  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const data = await usePagination(Deposit, {
    page,
    limit,
    sort: { createdAt: -1 },
  });

  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { bankNumber, amount, currency_id, note, userID } = body;

    // Basic validation
    if (!bankNumber || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Valid bankNumber and positive amount are required." },
        { status: 400 }
      );
    }

    // Retrieve the bank record
    const bank = await Bank.findOne({ bankNumber });

    // Validate bank existence
    if (!bank) {
      return NextResponse.json({ error: "Bank not found." }, { status: 404 });
    }

    // Validate bank status
    if (bank.status !== 1) {
      return NextResponse.json(
        { error: `មិនអាចដាក់លុយចូលបានទេលេខគណនី ${bankNumber} បានបិទហើយ .` },
        { status: 403 }
      );
    }

    // Update the bank's balance
    bank.amount = (bank.amount || 0) + amount;
    await bank.save();

    // Record the deposit
    const newDeposit = await Deposit.create({
      bank_id: bank._id,
      amount,
      currency_id,
      note,
      userID,
    });

    return NextResponse.json(
      {
        message: "Deposit created and bank amount updated successfully.",
        deposit: newDeposit,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating deposit:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
