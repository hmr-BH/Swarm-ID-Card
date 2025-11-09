"use client";

import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { useGeolocated } from "react-geolocated";
import { SwarmIDCard } from "@/components/SwarmIDCard";
import { TRANSLATIONS, Language } from "@/lib/translations";
import { BACKGROUND_PATTERNS, COLOR_SCHEMES, REGIONS } from "@/constants";
import { QRCodeService } from "@/services/qrCodeService";
import {
  generateRandomId,
  validateBilibiliId,
  detectRegionFromCoordinates,
} from "@/utils/helpers";

interface SwarmCardData {
  name: string;
  avatar: string;
  region: string;
  id: string;
  idType: "bilibili" | "random";
}

export default function SwarmIDCardGenerator() {
  const [language, setLanguage] = useState<Language>("zh");
  const [colorSchemeIndex, setColorSchemeIndex] = useState(0);
  const [customColor, setCustomColor] = useState("#1e40af");
  const [backgroundPattern, setBackgroundPattern] = useState("grid");
  const [textColor, setTextColor] = useState<"white" | "black">("white");
  const [cardData, setCardData] = useState<SwarmCardData>({
    name: language === "zh" ? "张三" : "John Doe",
    avatar: "/default-avatar.png",
    region: "E-AS",
    id: "",
    idType: "random",
  });
  const [bilibiliInput, setBilibiliInput] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[language];
  const currentColorScheme = COLOR_SCHEMES[colorSchemeIndex];

  const { getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  // 生成二维码
  const generateQRCode = async () => {
    if (!cardData.name || !cardData.id || !cardData.region) return;

    const qrData = {
      id: cardData.id,
      region:
        REGIONS["en"][cardData.region as keyof (typeof REGIONS)["en"]] ||
        cardData.region,
      name: cardData.name,
    };

    try {
      const url = await QRCodeService.generateQRCode(qrData);
      setQrCodeUrl(url);
    } catch (error) {
      console.error("QR Code generation failed:", error);
    }
  };

  // 自动定位
  const handleAutoLocate = async () => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );

      const { latitude, longitude } = position.coords;
      const region = detectRegionFromCoordinates(latitude, longitude);
      setCardData((prev) => ({ ...prev, region }));
    } catch (error) {
      console.error("Location failed:", error);
    }
  };

  // 处理ID类型切换
  const handleIdTypeChange = (type: "bilibili" | "random") => {
    setCardData((prev) => {
      const newId = type === "random" ? generateRandomId(prev.region) : prev.id;
      return { ...prev, idType: type, id: newId };
    });
  };

  // 处理B站ID输入
  const handleBilibiliInputChange = (value: string) => {
    setBilibiliInput(value);
    if (validateBilibiliId(value)) {
      setCardData((prev) => ({ ...prev, id: value.toUpperCase() }));
    }
  };

  // 处理头像上传
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCardData((prev) => ({
          ...prev,
          avatar: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 下载身份证
  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `swarm-id-${cardData.id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // 初始化和更新
  useEffect(() => {
    if (cardData.idType === "random" && !cardData.id) {
      const randomId = generateRandomId(cardData.region);
      setCardData((prev) => ({ ...prev, id: randomId }));
    }
  }, []);

  useEffect(() => {
    if (cardData.idType === "random" && cardData.id) {
      const newId = generateRandomId(cardData.region);
      setCardData((prev) => ({ ...prev, id: newId }));
    }
  }, [cardData.region]);

  useEffect(() => {
    generateQRCode();
  }, [cardData.name, cardData.id, cardData.region, language]);

  // 语言切换时更新示例姓名
  useEffect(() => {
    if (
      !cardData.name ||
      cardData.name === "张三" ||
      cardData.name === "John Doe"
    ) {
      setCardData((prev) => ({
        ...prev,
        name: language === "zh" ? "张三" : "John Doe",
      }));
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题和语言切换 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t.title}</h1>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setLanguage("zh")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                language === "zh"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              中文
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                language === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              English
            </button>
          </div>
        </div>

        <div className="flex lg:gap-8">
          {/* 设置面板 */}
          <div className="lg:w-1/2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="space-y-6">
              {/* ID类型选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.idType}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleIdTypeChange("bilibili")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      cardData.idType === "bilibili"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {t.bilibiliId}
                  </button>
                  <button
                    onClick={() => handleIdTypeChange("random")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      cardData.idType === "random"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {t.randomId}
                  </button>
                </div>
              </div>

              {/* ID输入 */}
              {cardData.idType === "bilibili" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.bilibiliId}
                  </label>
                  <input
                    type="text"
                    value={bilibiliInput}
                    onChange={(e) => handleBilibiliInputChange(e.target.value)}
                    placeholder={t.bilibiliPlaceholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* 姓名输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) =>
                    setCardData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* 头像上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.avatar}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t.uploadAvatar}
                </button>
                {cardData.avatar && (
                  <div className="mt-2 w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={cardData.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* 区域选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.region}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={handleAutoLocate}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {t.autoLocate}
                  </button>
                  <select
                    value={cardData.region}
                    onChange={(e) =>
                      setCardData((prev) => ({
                        ...prev,
                        region: e.target.value,
                      }))
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(REGIONS[language]).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 配色方案选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.colorScheme}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_SCHEMES.map((scheme, index) => (
                    <button
                      key={index}
                      onClick={() => setColorSchemeIndex(index)}
                      className={`h-10 rounded-lg border-2 transition-all ${
                        colorSchemeIndex === index
                          ? "border-blue-500 scale-105"
                          : "border-gray-300 hover:border-gray-400"
                      } ${
                        scheme.bg === "custom"
                          ? "bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400"
                          : `bg-gradient-to-r ${scheme.bg}`
                      }`}
                      title={scheme.name}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1 text-center">
                  {COLOR_SCHEMES[colorSchemeIndex].name}
                </div>

                {/* 自定义颜色选择器 */}
                {colorSchemeIndex === COLOR_SCHEMES.length - 1 && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.customColor}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="#1e40af"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 背景纹理选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.backgroundPattern}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {BACKGROUND_PATTERNS.map((pattern) => (
                    <button
                      key={pattern.id}
                      onClick={() => setBackgroundPattern(pattern.id)}
                      className={`h-10 rounded-lg border-2 transition-all ${
                        backgroundPattern === pattern.id
                          ? "border-blue-500 scale-105"
                          : "border-gray-300 hover:border-gray-400"
                      } bg-gray-100 flex items-center justify-center text-xs font-medium`}
                      title={t[pattern.id as keyof typeof t]}
                    >
                      {t[pattern.id as keyof typeof t]}
                    </button>
                  ))}
                </div>
              </div>

              {/* 文字颜色选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.textColor}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTextColor("white")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      textColor === "white"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {t.whiteText}
                  </button>
                  <button
                    onClick={() => setTextColor("black")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      textColor === "black"
                        ? "bg-white text-black border-2 border-gray-300"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {t.blackText}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 身份证预览 */}
          <div className="lg:w-1/2 flex flex-col items-center lg:sticky lg:top-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-4">
              <SwarmIDCard
                ref={cardRef}
                data={cardData}
                language={language}
                qrCodeUrl={qrCodeUrl}
                colorScheme={currentColorScheme}
                textColor={textColor}
                customColor={
                  colorSchemeIndex === COLOR_SCHEMES.length - 1
                    ? customColor
                    : undefined
                }
                backgroundPattern={backgroundPattern}
              />
            </div>

            {/* 下载按钮 */}
            <button
              onClick={handleDownload}
              disabled={!cardData.name || !cardData.id}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium shadow-lg"
            >
              {t.download}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
