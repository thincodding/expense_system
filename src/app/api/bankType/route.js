"use server";

import { NextResponse } from "next/server";
import connectDB from "../../config/config";
import BankTypes from "../../../../models/BankTypes";
import { usePagination } from '../../composable/usePagination'



export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');

  // If page and limit are provided, use pagination
  if (pageParam && limitParam) {
    const page = parseInt(pageParam, 10);
    const limit = parseInt(limitParam, 10);

    const data = await usePagination(BankTypes, {
      page,
      limit,
      sort: { createdAt: -1 },
    });

    return NextResponse.json(data);
  }

  // Otherwise, return all bank types sorted by createdAt
  const results = await BankTypes.find().sort({ createdAt: -1 });
  return NextResponse.json({ results });
}


export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { bankTypeName, note, userID } = body;

    if (!bankTypeName) {
      return NextResponse.json(
        { message: "bankTypeName is required" },
        { status: 400 }
      );
    }

    const newBankType = await BankTypes.create({
      bankTypeName,
      note,
      userID,
    });

    return NextResponse.json(newBankType, { status: 201 });
  } catch (error) {
    console.error("Error creating bank type:", error);
    return NextResponse.json(
      { message: "Server error", details: error.message },
      { status: 500 }
    );
  }
}