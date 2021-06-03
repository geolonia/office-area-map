export const clusterLayer = {
  id: "spots-cluster-layer",
  source: "spots",
  type: "circle",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": "#FF0000",
    "circle-radius": 20,
    "circle-opacity": 1,
  },
};

export const clusterCountLayer = {
  id: "cluster-count-layer",
  type: "symbol",
  source: "spots",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated} 件",
    "text-font": ["Noto Sans Regular"],
    "text-size": 12,
  },
  paint: {
    "text-color": "#FFFFFF",
  },
};

export const spotsLayer = {
  id: "spots-layer",
  type: "circle",
  source: "spots",
  filter: ["all", ["==", "$type", "Point"], ["!has", "point_count"]],
  paint: {
    "circle-radius": 13,
    "circle-color": "#FF0000",
    "circle-opacity": 0.4,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#FFFFFF",
    "circle-stroke-opacity": 1,
  },
};

export const spotLabelLayer = {
  id: "spots-label-layer",
  type: "symbol",
  source: "spots",
  layout: {
    "text-field": "{名称}",
    "text-font": ["Noto Sans Regular"],
    "text-variable-anchor": ["top", "bottom", "left", "right"],
    "text-radial-offset": 0.5,
    "text-justify": "auto",
    "text-size": 12,
    "text-anchor": "top",
    "text-max-width": 12,
    "text-allow-overlap": false,
  },
};
