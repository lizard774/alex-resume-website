import { schema, OutputType } from "./contact_POST.schema";
import superjson from "superjson";
import { db } from "../helpers/db";
import { sql } from "kysely";

const sanitize = (str: string) => {
  return str
    .trim()
    .replace(/<[^>]*>/g, "")
    .slice(0, 5000);
};

export async function handle(request: Request) {
  try {
    const text = await request.text();
    const json = superjson.parse(text);
    const result = schema.parse(json);

    // 1. Honeypot check
    if (result.website && result.website.trim() !== "") {
      return new Response(
        superjson.stringify({
          success: true,
          message: "Message sent successfully",
        } satisfies OutputType)
      );
    }

    // 2. Get IP address
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ??
      request.headers.get("x-real-ip") ??
      "unknown";

    // 3. Rate limiting check (max 3 submissions in the last 15 minutes)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const recentSubmissions = await db
      .selectFrom("contactSubmissions")
      .select(db.fn.count<number>("id").as("count"))
      .where("ipAddress", "=", ipAddress)
      .where("createdAt", ">", fifteenMinutesAgo)
      .executeTakeFirst();

    const count = recentSubmissions?.count ? Number(recentSubmissions.count) : 0;
    if (count >= 3) {
      return new Response(
        superjson.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429 }
      );
    }

    // 4. Input sanitization
    const sanitizedData = {
      name: sanitize(result.name),
      email: sanitize(result.email),
      subject: sanitize(result.subject),
      message: sanitize(result.message),
      ipAddress,
    };

    // Insert into DB
    await db.insertInto("contactSubmissions").values(sanitizedData).execute();

    return new Response(
      superjson.stringify({
        success: true,
        message: "Message sent successfully",
      } satisfies OutputType)
    );
  } catch (error) {
    let errorMessage = "An error occurred while processing your request.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(
      superjson.stringify({ error: errorMessage }),
      { status: 400 }
    );
  }
}