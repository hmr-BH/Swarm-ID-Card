import React from "react";
import { REGIONS } from "../constants/index";
import { BackgroundPattern } from "./BackgroundPattern";

interface SwarmCardData {
  name: string;
  avatar: string;
  region: string;
  id: string;
  idType: "bilibili" | "random";
}

interface SwarmIDCardProps {
  data: SwarmCardData;
  language: "zh" | "en";
  qrCodeUrl: string;
  colorScheme: any;
  textColor: "white" | "black";
  customColor?: string;
  backgroundPattern: string;
}

export const SwarmIDCard = React.forwardRef<HTMLDivElement, SwarmIDCardProps>(
  (
    { data, qrCodeUrl, colorScheme, textColor, customColor, backgroundPattern },
    ref,
  ) => {
    // 固定使用英文区域名称
    const regions = REGIONS["en"];
    const textColorClass =
      textColor === "white" ? "text-white" : "text-gray-900";

    // 处理自定义颜色
    const getBackgroundStyle = () => {
      if (colorScheme.bg === "custom" && customColor) {
        return { backgroundColor: customColor };
      }
      return {};
    };

    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${colorScheme.bg !== "custom" ? `bg-gradient-to-br ${colorScheme.bg} ${textColorClass}` : textColorClass}`}
        style={{
          width: "540px",
          height: "340px",
          borderRadius: "16px",
          ...getBackgroundStyle(),
        }}
      >
        {/* 背景纹理 */}
        <BackgroundPattern
          pattern={backgroundPattern}
          textColorClass={textColorClass}
        />

        {/* 四边金边效果 */}
        <div
          className={`absolute top-0 left-0 right-0 h-4 bg-gradient-to-r ${colorScheme.gold} shadow-lg`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r ${colorScheme.gold} shadow-lg`}
        ></div>
        <div
          className={`absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-b ${colorScheme.gold} shadow-lg`}
        ></div>
        <div
          className={`absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-b ${colorScheme.gold} shadow-lg`}
        ></div>

        {/* 主标题区域 - 调整顶部边距 */}
        <div className="text-center pt-8 pb-2 relative">
          <h2 className="text-2xl font-bold tracking-wider drop-shadow-lg">
            SWARM ID
          </h2>
          {/* 标题下方装饰线 */}
          <div className="mt-2 flex justify-center">
            <div
              className={`h-0.5 w-40 bg-gradient-to-r ${colorScheme.gold}`}
            ></div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="px-12 py-2">
          <div className="flex gap-5 items-center">
            {/* 左侧头像区域 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div
                  className={`w-30 h-30 rounded-full bg-white/20 border-3 border-white/50 flex items-center justify-center overflow-hidden shadow-xl`}
                >
                  {data.avatar ? (
                    <img
                      src={data.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl opacity-60">👤</div>
                  )}
                </div>
                {/* 头像外圈装饰 */}
                <div
                  className={`absolute inset-0 w-30 h-30 rounded-full border-2 ${textColor === "white" ? "border-white/30" : "border-gray-900/30"}`}
                ></div>
              </div>
            </div>

            {/* 中间信息区域 */}
            <div className="flex-1 space-y-4">
              {/* 姓名 */}
              <div>
                <div className="text-xs opacity-80 font-medium">Name</div>
                <div className="text-lg font-bold">
                  {data.name || "____________"}
                </div>
              </div>

              <div>
                <div className="text-xs opacity-80 font-medium">Swarm ID</div>
                <div className="text-base font-mono font-semibold tracking-wide">
                  {data.id || "____________"}
                </div>
              </div>

              <div>
                <div className="text-xs opacity-80 font-medium">Region</div>
                <div className="text-sm font-medium">
                  {regions[data.region as keyof typeof regions] || data.region}
                </div>
              </div>
            </div>

            {/* 右侧二维码区域 */}
            <div className="flex flex-col items-center">
              <div className="text-xs opacity-80 font-medium mb-2">QR Code</div>
              <div
                className={`bg-white/90 p-2 rounded-lg shadow-lg border ${textColor === "white" ? "border-white/30" : "border-gray-900/30"}`}
              >
                {qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-xs">QR</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
