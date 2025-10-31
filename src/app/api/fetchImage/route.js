import { signJWT } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { url } = await req.json();

  if (!url ) {
    return NextResponse.json(
      { error: "url is required." },
      { status: 400 }
    );
  }

  await fetch(``);

  if (existingUser) {
    return NextResponse.json(
      { error: "User with this email already exists." },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = signJWT({ userId: newUser.id, email: newUser.email });

  const res = NextResponse.json(
    { message: "User created successfully.", token },
    { status: 201 }
  );

  res.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/", // available on /dashboard
  });

  return res;
}