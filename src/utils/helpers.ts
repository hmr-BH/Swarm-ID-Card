export const generateRandomId = (region: string): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${region}-${timestamp}${random}`.toUpperCase();
};

export const validateBilibiliId = (id: string): boolean => {
  return /^\d+B$/i.test(id);
};

export const getBackgroundStyle = (colorScheme: any, customColor?: string) => {
  if (colorScheme.bg === "custom" && customColor) {
    return { backgroundColor: customColor };
  }
  return {};
};

export const detectRegionFromCoordinates = (
  latitude: number,
  longitude: number,
): string => {
  if (latitude > 66) {
    return "E-AN"; // 南极
  } else if (
    latitude > 23 &&
    latitude < 66 &&
    longitude > -170 &&
    longitude < -50
  ) {
    return "E-NA"; // 北美洲
  } else if (latitude < 0 && longitude > -80 && longitude < -35) {
    return "E-SA"; // 南美洲
  } else if (longitude > -10 && longitude < 40) {
    return "E-EU"; // 欧洲
  } else if (
    latitude > -35 &&
    latitude < 37 &&
    longitude > -20 &&
    longitude < 50
  ) {
    return "E-AF"; // 非洲
  } else if (longitude > 110 && longitude < 180) {
    return "E-OC"; // 大洋洲
  }
  return "E-AS"; // 默认亚洲
};
