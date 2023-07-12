import { NextResponse } from "next/server";
import UsersService from "@/lib/service/mongo/UsersService";
import TokenManager from "@/lib/tokenize/TokenManager";
import AuthValidator from "@/lib/validator/auth";

export async function POST(request) {
  try {
    const payload = await request.json();

    const usersService = new UsersService();
    const authValidator = new AuthValidator();

    authValidator.validatePostAuth(payload);
    const { username, password } = payload;

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
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const payload = await request.json();

    const authValidator = new AuthValidator();
    authValidator.validatePutAuth(payload);

    const { refreshToken } = payload;

    const { username, age } = TokenManager.verifyRefreshToken(refreshToken);
    const accessToken = TokenManager.generateAccessToken({ username, age });

    return NextResponse.json(
      {
        accessToken,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}
