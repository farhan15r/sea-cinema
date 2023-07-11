import database from "@/db/mongo";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UsersService from "@/lib/service/mongo/UsersService";
import TokenManager from "@/lib/tokenize/TokenManager";
import AuthValidator from "@/lib/validator/auth";

export async function POST(request) {
  const payload = await request.json();
  const { username, password } = payload;

  const usersService = new UsersService();
  const authValidator = new AuthValidator

  try {
    authValidator.validatePostAuth(payload);
    const user = await usersService.getUser(username);
    await usersService.validateCredentials(password, user.password);

    const tokenPayload = {
      username: user.username,
      age: user.age,
    };

    const accessToken = TokenManager.generateAccessToken(tokenPayload);
    const refreshToken = TokenManager.generateRefreshToken(tokenPayload);

    return NextResponse.json(
      {
        accessToken,
        refreshToken,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}

export async function PUT(request) {
  const req = await request.json();
  const { refreshToken } = req;

  try {
    const {username, age} = TokenManager.verifyRefreshToken(refreshToken);
    const accessToken = TokenManager.generateAccessToken({username, age});

    return NextResponse.json(
      {
        accessToken,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
