"use server"

import { NextResponse } from "next/server";
import connectDB from "../../config/config";
import Product from "../../../../models\/productModel";

export async function GET(){
    await connectDB();
    const pro = await Product.find();
    return NextResponse.json({pro})
}