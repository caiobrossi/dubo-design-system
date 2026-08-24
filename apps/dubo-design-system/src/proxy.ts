import { NextResponse, type NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|robots.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
