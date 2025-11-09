export const BACKGROUND_PATTERNS = [
  { id: "grid", name: "网格", nameEn: "Grid" },
  { id: "circuit", name: "电路板", nameEn: "Circuit Board" },
  { id: "hexagon", name: "蜂巢", nameEn: "Honeycomb" },
  { id: "dots", name: "点阵", nameEn: "Dot Matrix" },
  { id: "waves", name: "波纹", nameEn: "Waves" },
  { id: "geometric", name: "几何", nameEn: "Geometric" },
  { id: "tech", name: "科技", nameEn: "Tech" },
  { id: "minimal", name: "简约", nameEn: "Minimal" },
];

export const COLOR_SCHEMES = [
  {
    name: "深海蓝",
    bg: "from-blue-900 via-blue-800 to-indigo-900",
    gold: "from-yellow-400 via-yellow-500 to-yellow-400",
  },
  {
    name: "墨玉黑",
    bg: "from-gray-900 via-gray-800 to-black",
    gold: "from-yellow-400 via-yellow-500 to-yellow-400",
  },
  {
    name: "森林绿",
    bg: "from-green-900 via-green-800 to-emerald-900",
    gold: "from-yellow-400 via-yellow-500 to-yellow-400",
  },
  {
    name: "酒红色",
    bg: "from-red-900 via-red-800 to-rose-900",
    gold: "from-yellow-400 via-yellow-500 to-yellow-400",
  },
  {
    name: "紫罗兰",
    bg: "from-purple-900 via-purple-800 to-violet-900",
    gold: "from-yellow-400 via-yellow-500 to-yellow-400",
  },
  {
    name: "琥珀橙",
    bg: "from-orange-900 via-orange-800 to-amber-900",
    gold: "from-yellow-400 via-yellow-500 to-yellow-400",
  },
  {
    name: "青金石",
    bg: "from-cyan-900 via-cyan-800 to-blue-900",
    gold: "from-yellow-400 via-yellow-500 to-yellow-400",
  },
  {
    name: "自定义",
    bg: "custom",
    gold: "from-yellow-400 via-yellow-500 to-yellow-400",
  },
];

export const REGIONS = {
  zh: {
    "E-AS": "地球-亚洲区",
    "E-AN": "地球-南极区",
    "E-NA": "地球-北美洲区",
    "E-SA": "地球-南美洲区",
    "E-EU": "地球-欧洲区",
    "E-AF": "地球-非洲区",
    "E-OC": "地球-大洋洲区",
  },
  en: {
    "E-AS": "Earth-Asia",
    "E-AN": "Earth-Antarctica",
    "E-NA": "Earth-North America",
    "E-SA": "Earth-South America",
    "E-EU": "Earth-Europe",
    "E-AF": "Earth-Africa",
    "E-OC": "Earth-Oceania",
  },
} as const;
