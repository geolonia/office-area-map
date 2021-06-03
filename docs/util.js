export const csv2geojson = (csv) => {
  const [header, ...rows] = csv.split("\r\n");
  return {
    type: "FeatureCollection",
    features: rows.map((row) => {
      const keys = header.split(",");
      const values = row.split(",");
      return values.reduce(
        (prev, value, index) => {
          if (value === "") {
            return prev;
          } else {
            const key = keys[index];
            console.log(key, value);
            if (key === "経度") {
              prev.geometry.coordinates[0] = parseFloat(value);
            } else if (key === "緯度") {
              prev.geometry.coordinates[1] = parseFloat(value);
            } else {
              prev.properties[key] = value;
            }
            return prev;
          }
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
        }
      );
    }),
  };
};
