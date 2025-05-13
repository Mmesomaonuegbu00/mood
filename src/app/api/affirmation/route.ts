// app/api/affirmation/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://www.affirmations.dev");
    const data = await res.json();
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { affirmation: "You are strong and capable. Keep going!" },
      { status: 500 }
    );
  }
}
