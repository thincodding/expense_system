"use server";

import { NextResponse } from "next/server";
import connectDB from "../../../config/config";
import Users from "../../../../../models/Users";


export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = params;

        const deletedUser = await Users.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User deleted successfully" },
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

        const { userName, email, password, roles } = body;
        const updateData = { userName, email, password, roles };

        const updatedUser = await Users.findByIdAndUpdate(id, updateData, {
            new: true 
        });

        if (!updatedUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User updated", user: updatedUser },
            { status: 200 }
        );
    } catch (error) {
        console.error("PUT /api/signup/[id] error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}