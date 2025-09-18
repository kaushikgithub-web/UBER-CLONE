
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ride from "@/models/Ride";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const filter = status ? { status } : {};
  const rides = await Ride.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(rides);
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const ride = await Ride.create(body);
  return NextResponse.json(ride);
}
