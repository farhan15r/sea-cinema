import TokenManager from "@/lib/tokenize/TokenManager";
import { NextResponse } from "next/server";
import UsersService from "@/lib/service/mongo/UsersService";

export async function GET({ headers }) {
  const usersService = new UsersService();

  try {
    const token = TokenManager.getTokenFromHeaders(headers);
    const { username } = TokenManager.verifyAccessToken(token);
    const balance = await usersService.getBalance(username);

    return NextResponse.json({ balance }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
/**
 * json body
 * {
 * amount: 1000,
 * type: "topup",
 * method: "paypal"
 * }
 */
export async function PUT(request) {
  const req = await request.json();
  const { headers } = request;
  const { amount, type, method } = req;

  const usersService = new UsersService();

  try {
    const token = TokenManager.getTokenFromHeaders(headers);
    const { username } = TokenManager.verifyAccessToken(token);

    const newBalance = await usersService.updateBalance(
      username,
      amount,
      type,
      method
    );

    return NextResponse.json(
      { message: `Success ${type} ${amount}`, balance: newBalance },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
