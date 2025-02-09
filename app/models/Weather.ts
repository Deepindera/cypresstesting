// Define a class for the forecast entries
 export class Forecast {
    day: string;
    temperature: string;
    wind: string;
  
    constructor(day: string, temperature: string, wind: string) {
      this.day = day;
      this.temperature = temperature;
      this.wind = wind;
    }
  }
  
  // Define the main weather class
  export default  class Weather {
    temperature: string;
    wind: string;
    description: string;
    forecast: Forecast[];
  
    constructor(
      temperature: string,
      wind: string,
      description: string,
      forecast: Forecast[]
    ) {
      this.temperature = temperature;
      this.wind = wind;
      this.description = description;
      this.forecast = forecast;
    }
  
    static fromJSON(json: WeatherJSON): Weather {
      return new Weather(
        json.temperature,
        json.wind,
        json.description,
        json.forecast.map(
          (f: ForecastJSON) => new Forecast(f.day, f.temperature, f.wind)
        )
      );
    }
  }

  type ForecastJSON = {
    day: string;
    temperature: string;
    wind: string;
  };
  
  type WeatherJSON = {
    temperature: string;
    wind: string;
    description: string;
    forecast: ForecastJSON[];
  };
  