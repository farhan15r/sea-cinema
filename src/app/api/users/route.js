import { NextResponse } from "next/server";
import UsersService from "@/lib/service/mongo/UsersService";
import UsersValidator from "@/lib/validator/users";

export async function POST(request) {
  const payload = await request.json();
  const { fullName, username, age, password } = payload;

  const usersService = new UsersService();
  const usersValidator = new UsersValidator();

  try {
    usersValidator.validatePostUser(payload);
    await usersService.checkUsernameAvailable(username);
    await usersService.addUser({ fullName, username, age, password });

    return NextResponse.json(
      { message: "Register successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}
