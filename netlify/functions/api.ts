// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();

api.get("/api/getAge", (req, res) => {
    // Отримуємо параметри із запиту
    const methodParameters = req.query || {};

    // Повертаємо відповідь з віком
    const result = {
        method_parameters: methodParameters,
        result: {
            age: 13
        }
    };

    res.json(result);
});

api.get("/api/getFullName", (req, res) => {
    // Отримуємо параметри із запиту
    const methodParameters = req.query || {};
    let fullName = "";

    if (methodParameters.name && methodParameters.last_name) {
        fullName = `${methodParameters.name} ${methodParameters.last_name}`;
    }

    // Повертаємо відповідь з повним іменем
    const result = {
        result: {
            full_name: fullName
        }
    };

    res.json(result);
});

api.use("/api/", router);

export const handler = serverless(api);
