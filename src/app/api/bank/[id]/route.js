"use server";

import { NextResponse } from "next/server";
import connectDB from "../../../config/config";
import Banks from "../../../../../models/Banks";


export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = params;

        await Banks.findByIdAndDelete(id);

       
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
  
      const {
        bankName,
        bankNumber,
        bankTypeId,
        amount,
        status,
        note,
        userID,
      } = body;
  
   
      const existingBank = await Banks.findOne({
        bankNumber,
        _id: { $ne: id }, // Exclude current bank
      });
  
      if (existingBank) {
        return NextResponse.json(
          { message: "Another bank already uses this bankNumber" },
          { status: 409 }
        );
      }
  
      const updateField = {
        bankName,
        bankNumber,
        bankTypeId,
        amount,
        note,
        status,
        userID,
      };
  
      const updateData = await Banks.findByIdAndUpdate(id, updateField, {
        new: true,
      });
  
      if (!updateData) {
        return NextResponse.json({ message: "Bank not found" }, { status: 404 });
      }
  
      return NextResponse.json(
        { message: "Bank updated successfully", updateData },
        { status: 200 }
      );
    } catch (error) {
      console.error("Update error:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }