"use server";

import { NextResponse } from "next/server";
import connectDB from "../../config/config";
import Users from "../../../../models/Users";
import bcrypt from "bcrypt";

export async function GET() {
    await connectDB();
    const user = await Users.find();
    return NextResponse.json({ user });
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        const { userName, email, password, roles } = body;

        if (!userName || !email || !password || !roles) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Users.create({
            userName,
            email,
            password: hashedPassword,
            roles,
        });

        return NextResponse.json(
            {
                message: "User created successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

