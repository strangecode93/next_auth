import { connectDB as connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/detDataFromToken";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        if(!user) {
            return NextResponse.json({error: "User not found"}, {status: 400});
        }
        return NextResponse.json({
            message: "User fetched successfully",
            success: true,
            user
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}