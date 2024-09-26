import { Router } from "express";
import { getCountries, getCountryInfo } from "../controllers/countryController";

const router = Router();

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Retrieve a list of countries
 *     responses:
 *       200:
 *         description: A list of countries
 */
router.get("/countries", getCountries);

/**
 * @swagger
 * /api/country/{code}/{countryName}:
 *   get:
 *     summary: Retrieve information about a specific country
 *     parameters:
 *       - name: code
 *         in: path
 *         required: true
 *         description: The country code (2-letter ISO 3166-1)
 *         schema:
 *           type: string
 *       - name: countryName
 *         in: path
 *         required: true
 *         description: The full country name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Country information including borders, population, and flag.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 borders:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of border countries.
 *                 population:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       year:
 *                         type: number
 *                         description: Year of the population count.
 *                       value:
 *                         type: number
 *                         description: Population value for that year.
 *                 flag:
 *                   type: string
 *                   description: URL of the country flag.
 *       400:
 *         description: Invalid country code or name.
 *       500:
 *         description: Failed to fetch country info.
 */
router.get("/country/:code/:countryName", getCountryInfo);

export default router;
