# RealityMix Listings Scraper

Puppeteer-based real estate advertisement scraper.

## Usage

Several input properties support a full text specification of their value. Once the required input is specified, the actor constructs an URL with the specified filter. The linked page features 20 listings. The actor switches the pages during the search, thus allowing to collect more than 20 listings in a single run. The Actor uses Puppeteer, the minimum required memory for running is 2048 MB.

## Input

Since some properties support full text values, we provide a comprehensive list of supported values.

| Property name     | Possible values        | Required           |
| ----------------- | ---------------------- | ------------------ |
| **state**         | Praha                  | **yes**            |
|                   | Jihočeský kraj         |                    |
|                   | Jihomoravský kraj      |                    |
|                   | Karlovarský kraj       |                    |
|                   | Královéhradecký kraj   |                    |
|                   | Liberecký kraj         |                    |
|                   | Moravskoslezský kraj   |                    |
|                   | Olomoucký kraj         |                    |
|                   | Pardubický kraj        |                    |
|                   | Plzeňský kraj          |                    |
|                   | Středočeský kraj       |                    |
|                   | Ústecký kraj           |                    |
|                   | Vysočina               |                    |
|                   | Zlínský kraj           |                    |
| **layout**        | Garsoniéra             | **yes**            |
|                   | 1+kk                   |                    |
|                   | 1+1                    |                    |
|                   | 2+kk                   |                    |
|                   | 2+1                    |                    |
|                   | 3+kk                   |                    |
|                   | 3+1                    |                    |
|                   | 4+kk                   |                    |
|                   | 4+1                    |                    |
|                   | 5+kk                   |                    |
|                   | 5+1                    |                    |
|                   | 6+kk                   |                    |
|                   | 6+1                    |                    |
|                   | 7+kk                   |                    |
|                   | 7+1                    |                    |
|                   | Atypický               |                    |
|                   | Jiný                   |                    |
| **advertType**    | Prodej                 | **yes**            |
|                   | Pronájem               |                    |
|                   | Vše                    |                    |
| **buildingType**  | Byty                   | **yes**            |
|                   | Domy                   |                    |
|                   | Chaty                  |                    |
|                   | Pozemky                |                    |
| **ownershipType** | osobní vlastnictví     | **yes**            |
|                   | družstevní vlastnictví |                    |
|                   | jiné vlastnictví       |                    |
| **priceStart**    | 0, 1, ...              | **no**             |
| **priceEnd**      | 0, 1, ...              | **no**             |
| **areaFrom**      | 0, 1, ...              | **no**             |
| **areaTo**        | 0, 1, ...              | **no**             |
| **levelFrom**     | 0, 1, ...              | **no**             |
| **levelTo**       | 0, 1, ...              | **no**             |

## Output

The output of the Actor features details of each listing. The detail contains the type of the advertised building, its location, and its price. URLs to provided images are listed in the result as well. Additionally, the output contains the content of the listing's overview table. Moreover, the full text description is also included.

