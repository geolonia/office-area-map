/**
 * クラスター表示のレイヤーとそのスタイルの定義
 */
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

/**
 * クラスター表示内の数字ラベルのレイヤーとそのスタイルの定義
 */
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

/**
 * スポットの表示のレイヤーとそのスタイルの定義
 */
export const spotLabelLayer = {
  id: "spots-label-layer",
  type: "symbol",
  source: "spots",
  layout: {
    "icon-image": "{カテゴリ}",
    "text-field": "{名称}",
    "text-font": ["Noto Sans Regular"],
    "text-variable-anchor": ["top", "bottom", "left", "right"],
    "text-radial-offset": 1.5,
    "text-justify": "auto",
    "text-size": 12,
    "text-anchor": "top",
    "text-max-width": 12,
    "text-allow-overlap": false,
  },
};
