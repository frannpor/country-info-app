# Country API

## Description

This API allows you to get information about countries, including lists of available countries and details about a specific country, such as its borders, population and flag.

## Endpoints

### Get list of countries

- URL**: `/api/countries`.
- **Method**: `GET`.
- **Response**: 
  - 200 OK: A list of available countries.

### Get country information

- **URL**: `/api/country/{code}`
- **Method**: `GET`
- **Answer**: 200
- **Parameters**:
  - `code`: The country code (2-letter ISO 3166-1 code).
- **Response**:
  - 200 OK: Country information, including borders, population and flag.
  - 400 Bad Request: Invalid country code.
  - 500 Internal Server Error: Failed to obtain country information.

## Installation

1. Clone this repository.
Navigate to the project directory.
3. Install the dependencies:
   ````bash
   npm install
