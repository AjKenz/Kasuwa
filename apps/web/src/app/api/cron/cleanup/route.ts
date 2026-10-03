import { NextResponse } from "next/server";

export async function GET() {
  const ranAt = new Date().toISOString();
  console.log(`[cron] cleanup ran at ${ranAt}`);
  return NextResponse.json({ ok: true, ranAt });
}
