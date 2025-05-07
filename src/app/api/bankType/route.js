"use server";

import { NextResponse } from "next/server";
import connectDB from "../../config/config";
import BankTypes from "../../../../models/BankTypes";


export async function GET() {
  await connectDB();
  const bankType = await BankTypes.find().sort({ createdAt: -1 });
  return NextResponse.json({ bankType });
}


export async function POST(req) {
    try {
      await connectDB(); // Ensure MongoDB is connected
  
      const body = await req.json();
      const { bankTypeName, note, userID } = body;
  
      if (!bankTypeName) {
        return NextResponse.json({ message: "bankTypeName is required" }, { status: 400 });
      }
  
      const newBankType = await BankTypes.create({
        bankTypeName,
        note,
        userID,
      });
  
      return NextResponse.json(newBankType, { status: 201 });
    } catch (error) {
      console.error("Error creating bank type:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }