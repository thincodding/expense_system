"use server";

import { NextResponse } from "next/server";
import connectDB from "../../config/config";
import Users from "../../../../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET 

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    // Check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        roles: user.roles,
      },
    });
  } catch (error) {
    console.error("LOGIN error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
