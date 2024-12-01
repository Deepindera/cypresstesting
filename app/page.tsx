import { WiDaySunny, WiCloudy, WiRain } from "react-icons/wi";

export default async function Home() {
  // Dummy data to use when the API fails or doesn't return data
  const dummyData = {
    temperature: "23",
    wind: "6",
    description: "rain",
    forecast: [
      { day: "1", temperature: "19", wind: "6" },
      { day: "2", temperature: "20", wind: "14" },
      { day: "3", temperature: "35", wind: "15" },
    ],
  };

  let weather;
  const city = "Melbourne";
  const res = await fetch("https://goweather.herokuapp.com/weather/" + city, {
    cache: "force-cache", // Use "force-cache" for caching or "no-store" for fresh data
  });
  if (res.ok) {
    weather = await res.json();

    // Validate that necessary fields are present, fallback to dummy data if not
    if (!weather || !weather.temperature || !weather.forecast) {
      weather = dummyData;
    }
  } else {
    weather = dummyData;
  }

  const getWeatherIcon = (description: string) => {
    if (description.includes("clear") || description.includes("sunny")) {
      return <WiDaySunny aria-label="Sunny" color="orange" size={50} />;
    } else if (description.includes("cloudy")) {
      return <WiCloudy aria-label="Cloudy" size={50} />;
    } else if (description.includes("rain")) {
      return <WiRain aria-label="Rain" color="blue" size={50} />;
    }
    return <div>Icon not available</div>;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Weather Details {city}</h1>
      {/* Current Weather Table */}
      <table className="table-auto border-collapse border border-gray-300 w-full mb-8">
        <thead>
          <tr>
            <th
              colSpan={2}
              className="border border-gray-300 bg-gray-100 p-2 text-left"
            >
              Current Weather
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2 font-medium">
              Temperature
            </td>
            <td className="border border-gray-300 p-2">
              {weather.temperature}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-medium">Wind</td>
            <td className="border border-gray-300 p-2">{weather.wind}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-medium">
              Description
            </td>
            <td className="border border-gray-300 p-2">
              {weather.description}{" "}
              {getWeatherIcon(weather.description.toLowerCase())}
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-lg font-bold mb-4">Forecast</h2>
      {/* Forecast Table */}
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 bg-gray-100 p-2">Day</th>
            <th className="border border-gray-300 bg-gray-100 p-2">
              Temperature
            </th>
            <th className="border border-gray-300 bg-gray-100 p-2">Wind</th>
          </tr>
        </thead>
        <tbody>
          {weather.forecast.map((f: Forecast, index: number) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                {f.day == "1"
                  ? "Tomorrow"
                  : f.day == "2"
                  ? "After Tomorrow"
                  : "2 Days later"}
              </td>
              <td className="border border-gray-300 p-2">{f.temperature}</td>
              <td className="border border-gray-300 p-2">{f.wind}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
