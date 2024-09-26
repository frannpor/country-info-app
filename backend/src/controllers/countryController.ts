import { Request, Response, NextFunction } from "express";
import countryService from "../services/countryService";
import catchAsync from "../utils/catchAsync";

export const getCountries = catchAsync(async (req: Request, res: Response) => {
  const countries = await countryService.fetchAvailableCountries();
  res.json(countries);
});

export const getCountryInfo = catchAsync(
  async (req: Request, res: Response) => {
    const { code, countryName } = req.params;
    const countryInfo = await countryService.fetchCountryInfo(code, countryName);
    res.json(countryInfo);
  }
);
