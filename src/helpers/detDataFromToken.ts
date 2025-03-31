import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const encodedToken = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(
            encodedToken,
            process.env.TOKEN_SECRET!
        ) as { id: string };
        return decodedToken.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
};