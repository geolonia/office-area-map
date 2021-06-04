import { clusterLayer, clusterCountLayer, spotLabelLayer } from "./layers.js";
// import { csv2geojson } from "./util.js";

// const spreadsheetCSVExportUrl =
//   "https://docs.google.com/spreadsheets/d/e/2PACX-1vScMm_fKfKVravIvXN3NnG9gRRdsti00wEWjTWfebqe8P9uxKMIsn5pcNE2dLDSf3ac8Udm3RydkMw0/pub?gid=0&single=true&output=csv";

const fetchDataAsGeoJSON = () => {
  return fetch("./data.geojson").then((res) => res.json());
};

const main = async () => {
  const geojsonObject = await fetchDataAsGeoJSON();
  const map = new window.geolonia.Map("#map");

  map.on("load", () => {
    map.addSource("spots", {
      type: "geojson",
      data: geojsonObject,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    map.addLayer(clusterLayer);
    map.addLayer(clusterCountLayer);
    map.addLayer(spotLabelLayer);

    const style = map.getStyle();
    style.sprite = "https://geolonia.github.io/office-area-map/icons/basic";
    map.setStyle(style);

    map.on("click", "spots-cluster-layer", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["spots-cluster-layer"],
      });
      const clusterId = features[0].properties.cluster_id;
      map
        .getSource("spots")
        .getClusterExpansionZoom(clusterId, (error, zoom) => {
          if (error) {
            return;
          } else {
            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          }
        });
    });
  });
};

main();
