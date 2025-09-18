import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ride from "@/models/Ride";

export async function POST(request, { params }) {
  await connectDB();
  const { id } = params;

  const ride = await Ride.findByIdAndUpdate(id, { status: "accepted" }, { new: true });
  if (!ride) return NextResponse.json({ error: "Ride not found" }, { status: 404 });

  return NextResponse.json(ride);
}
