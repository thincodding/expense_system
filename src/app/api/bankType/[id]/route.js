"use server";

import { NextResponse } from "next/server";
import connectDB from "../../../config/config";
import BankTypes from "../../../../../models/BankTypes";


export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = params;

        await BankTypes.findByIdAndDelete(id);

       
        return NextResponse.json(
            { message: "Bank deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = params;
        const body = await req.json();

        const { bankTypeName, note, userID } = body;
        const updateField = { bankTypeName, note, userID };

        const updateData = await BankTypes.findByIdAndUpdate(id, updateField, {
            new: true
        });

  
        return NextResponse.json(
            { message: "BankType updated", user: updateData },
            { status: 200 }
        );
    } catch (error) {
        console.error("PUT /api/signup/[id] error:", error);
      
    }
}
