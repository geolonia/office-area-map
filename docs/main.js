const spreadsheetCSVExportUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vScMm_fKfKVravIvXN3NnG9gRRdsti00wEWjTWfebqe8P9uxKMIsn5pcNE2dLDSf3ac8Udm3RydkMw0/pub?gid=0&single=true&output=csv";

const fetchDataAsGeoJSON = () => {
  return fetch(spreadsheetCSVExportUrl)
    .then((res) => res.text())
    .then((csv) => {
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
    });
};

const main = async () => {
  const geojsonObject = await fetchDataAsGeoJSON();
  const map = new window.geolonia.Map("#map");
  map.addSource("spots", {
    type: "geojson",
    data: geojsonObject,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });
  map.addLayer({
    id: "spots-layer",
    source: "spots",
    type: "circle",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
  });
  map.on("click", "clusters", function (e) {
    alert(1);
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });
    var clusterId = features[0].properties.cluster_id;
    map
      .getSource("spots")
      .getClusterExpansionZoom(clusterId, function (err, zoom) {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
  });
};
main();
