import database from "@/db/mongo";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UsersService from "@/lib/service/mongo/UsersService";
import TokenManager from "@/lib/tokenize/TokenManager";

export async function POST(request) {
  const req = await request.json();
  const { username, password } = req;

  const userService = new UsersService();

  try {
    const user = await userService.getUser(username);
    await userService.validateCredentials(password, user.password);

    const accessToken = TokenManager.generateAccessToken({ username, age: user.age, balance: user.balance });
    const refreshToken = TokenManager.generateRefreshToken({ username, age: user.age, balance: user.balance });

    return NextResponse.json({
      accessToken,
      refreshToken
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status  });
  }
}
