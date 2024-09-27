import { Request, Response, NextFunction } from "express";
import countryService from "../services/countryService";
import catchAsync from "../utils/catchAsync";

export const getCountries = catchAsync(async (req: Request, res: Response) => {
  const countries = await countryService.fetchAvailableCountries();
  res.json(countries);
});

export const getCountryInfo = catchAsync(
  async (req: Request, res: Response) => {
    const code = req.params.code;
    const countryName = decodeURIComponent(req.params.countryName);
    const countryInfo = await countryService.fetchCountryInfo(
      code,
      countryName
    );
    res.json(countryInfo);
  }
);
