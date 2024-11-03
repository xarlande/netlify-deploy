// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();

const validUsername = "root";
const validPassword = "root";

function checkAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ message: "Авторизація потрібна" });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    if (username === validUsername && password === validPassword) {
        return next();
    } else {
        return res.status(403).json({ message: "Невірний логін або пароль" });
    }
}

api.get("/api/customMessage", checkAuth,(req, res) => {
    const { name, theme } = req.query;

    const messages: { [key: string]: string[] } = {
        motivation: [
            "Ніколи не зупиняйся, навіть якщо важко.",
            "Великі досягнення починаються з маленьких кроків.",
            "Тільки той, хто йде вперед, досягне мети."
        ],
        humor: [
            "Код писався довго, а запускався швидко. І одразу ж вилетів :)",
            "Програмування - це коли ти знаєш всі помилки на ім'я.",
            "Щоб стати успішним програмістом, просто не залишай жодного багу без уваги!"
        ]
    };

    const chosenTheme = theme && messages[theme as string] ? theme : "motivation";
    const randomIndex = Math.floor(Math.random() * messages[chosenTheme].length);
    const randomMessage = messages[chosenTheme][randomIndex];

    const resultMessage = name
        ? `Привіт, ${name}! ${randomMessage}`
        : randomMessage;

    res.json({
        message: resultMessage
    });
});

api.use("/api/", router);

export const handler = serverless(api);
