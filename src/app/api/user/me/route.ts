import { Connect } from "@/db/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";


Connect();


export async function POST(request: NextRequest) {

    //get user id from token
    const userId = await getDataFromToken(request);   //getDataFromToken function is imported from getDataFromToken.ts

    const user = await User.findById({ _id: userId }).select("-password");

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });





}