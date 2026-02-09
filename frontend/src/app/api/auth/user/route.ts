import { getUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const matricNumber = await getUser();
        return NextResponse.json({ success: true, matricNumber });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
