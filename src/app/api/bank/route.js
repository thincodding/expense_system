"use server";

import { NextResponse } from "next/server";
import connectDB from "../../config/config";
import Banks from "../../../../models/Banks";


export async function GET() {
    await connectDB();
    const data = await Banks.find();
    return NextResponse.json({ data });
}

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const {
            bankName,
            bankNumber,
            bankTypeId,
            amount,
            status,
            note,
            userID,
        } = body;

        if (!bankName || !bankNumber) {
            return NextResponse.json(
                { message: "bankName and bankNumber are required" },
                { status: 400 }
            );
        }

        const existingBank = await Banks.findOne({ bankNumber });

        if (existingBank) {
            return NextResponse.json(
                { message: "Bank with this number already exists" },
                { status: 409 }
            );
        }

        const newBank = await Banks.create({
            bankName,
            bankNumber,
            bankTypeId,
            amount,
            status,
            note,
            userID,
        });

        return NextResponse.json(newBank, { status: 201 });
    } catch (error) {
        console.error("Error creating bank:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

