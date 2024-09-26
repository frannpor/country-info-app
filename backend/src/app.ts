import express from "express";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Country API",
      version: "1.0.0",
      description: "API to fetch country information",
    },
  },
  apis: ["./src/routes/countryRoutes.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api", countryRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(errorHandler);

export default app;
