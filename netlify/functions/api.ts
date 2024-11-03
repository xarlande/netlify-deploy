// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();

api.get("/api/customMessage", (req, res) => {
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


api.get("/api/getAge", (req, res) => {
    const methodParameters = req.query || {};

    const result = {
        method_parameters: methodParameters,
        result: {
            age: 13
        }
    };

    res.json(result);
});

api.get("/api/getFullName", (req, res) => {
    const methodParameters = req.query || {};
    let fullName = "";

    if (methodParameters.name && methodParameters.last_name) {
        fullName = `${methodParameters.name} ${methodParameters.last_name}`;
    }

    const result = {
        result: {
            full_name: fullName
        }
    };

    res.json(result);
});

api.use("/api/", router);

export const handler = serverless(api);
