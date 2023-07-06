import { NextResponse } from "next/server";
import UsersService from "@/lib/service/mongo/UsersService";

export async function POST(request) {
  const req = await request.json();
  const { fullName, username, age, password } = req;

  const usersService = new UsersService();

  try {
    await usersService.checkUsernameAvailable(username);
    await usersService.addUser({ fullName, username, age, password });

    return NextResponse.json({ message: "Register successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status  });
  }

}
  