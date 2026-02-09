import { login } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { matricNumber, password } = await request.json();
        const result = await login(matricNumber, password);

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
