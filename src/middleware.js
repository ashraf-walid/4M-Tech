import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

console.log("🚀 MIDDLEWARE FILE LOADED - This should appear on server startup");

export function middleware(req) {

  console.log("🔵🔥 MIDDLEWARE FIRED → pathname:", req.nextUrl.pathname);

  const token = req.cookies.get("auth")?.value;

  console.log("🎯 the value of token from middleware file is :", token)

  const pathname = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = decoded.role;

  if (pathname.startsWith("/dashboard") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/editor-panel") && role !== "editor") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/reports") && role !== "manager") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/editor-panel/:path*",
    "/reports/:path*",
    "/_next/data/:path*/dashboard/:path*",
    "/_next/data/:path*/editor-panel/:path*",
    "/_next/data/:path*/reports/:path*",
  ],
};

console.log("🔧 MIDDLEWARE CONFIG LOADED - matcher:", config.matcher);
