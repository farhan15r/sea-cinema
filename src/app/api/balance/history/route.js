import TokenManager from "@/lib/tokenize/TokenManager";
import { NextResponse } from "next/server";
import UsersService from "@/lib/service/mongo/UsersService";

export async function GET({ headers }) {
  try {
    const usersService = new UsersService();

    const token = TokenManager.getTokenFromHeaders(headers);
    const { username } = TokenManager.verifyAccessToken(token);

    const histories = await usersService.getHistories(username);

    return NextResponse.json({ histories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}
