import TokenManager from "@/lib/tokenize/TokenManager";
import { NextResponse } from "next/server";
import UsersService from "@/lib/service/mongo/UsersService";
import BalanceValidator from "@/lib/validator/balance";

export async function GET({ headers }) {
  try {
    const usersService = new UsersService();

    const token = TokenManager.getTokenFromHeaders(headers);
    const { username } = TokenManager.verifyAccessToken(token);

    const balance = await usersService.getBalance(username);

    return NextResponse.json({ balance }, { status: 200 });
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
    const { headers } = request;

    const usersService = new UsersService();
    const balanceValidator = new BalanceValidator();

    balanceValidator.validatePutBalance(payload);
    const token = TokenManager.getTokenFromHeaders(headers);
    const { username } = TokenManager.verifyAccessToken(token);
    const { amount, type, method } = payload;

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
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}
