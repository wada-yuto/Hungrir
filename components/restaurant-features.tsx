"use client";
import {
  Wifi, DoorClosed, CreditCard, Car, Ban, Wine, Utensils, Baby, Dog,
  Sun, Moon, Tv, Music2, Mic2, Languages
} from "lucide-react"
import type { Restaurant } from "@/types/restaurant"

import type { JSX } from "react";

const featureIconMap: Record<string, () => JSX.Element> = {
  WiFi: () => <Wifi className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  個室: () => <DoorClosed className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  クレジットカード: () => <CreditCard className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  禁煙席: () => <Ban className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  パーキング: () => <Car className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  飲み放題: () => <Wine className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  食べ放題: () => <Utensils className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  コース: () => <Utensils className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  英語メニュー: () => <Languages className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  ペット可: () => <Dog className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  お子様連れ: () => <Baby className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  ランチ: () => <Sun className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  深夜営業: () => <Moon className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  オープンエア: () => <Sun className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  カラオケ: () => <Mic2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  バンド演奏可: () => <Music2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  TVプロジェクター: () => <Tv className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
}

const formatFeatureName = (key: string): string => {
  const map: Record<string, string> = {
    WiFi: "Wi-Fi",
    個室: "個室あり",
    クレジットカード: "カード可",
    禁煙席: "禁煙席あり",
    パーキング: "駐車場あり",
    飲み放題: "飲み放題あり",
    食べ放題: "食べ放題あり",
    コース: "コースあり",
    英語メニュー: "英語メニュー",
    ペット可: "ペット可",
    お子様連れ: "お子様歓迎",
    ランチ: "ランチあり",
    深夜営業: "深夜営業",
    オープンエア: "オープンエア席",
    カラオケ: "カラオケあり",
    バンド演奏可: "バンド演奏可",
    TVプロジェクター: "TV・プロジェクター",
  }
  return map[key] || key
}

const getRestaurantFeatures = (restaurant: Restaurant) => {
  return {
    WiFi: restaurant.wifi === "あり",
    個室: restaurant.private_room === "あり",
    クレジットカード: restaurant.card === "利用可",
    禁煙席: restaurant.non_smoking?.includes("禁煙"),
    パーキング: restaurant.parking === "あり",
    飲み放題: restaurant.free_drink === "あり",
    食べ放題: restaurant.free_food === "あり",
    コース: restaurant.course === "あり",
    英語メニュー: restaurant.english === "あり",
    ペット可: restaurant.pet === "可",
    お子様連れ: restaurant.child?.includes("歓迎"),
    ランチ: restaurant.lunch === "あり",
    深夜営業: restaurant.midnight === "営業している",
    オープンエア: restaurant.open_air === "あり",
    カラオケ: restaurant.karaoke === "あり",
    バンド演奏可: restaurant.band === "可",
    TVプロジェクター: restaurant.tv === "あり" || restaurant.equipment?.includes("プロジェクター"),
  }
}

export function RestaurantFeatures({ restaurant }: { restaurant: Restaurant }) {
  const features = getRestaurantFeatures(restaurant)

  return (
    <div>
      <h3 className="font-bold text-center text-zinc-800 dark:text-zinc-200 hover: text">サービス</h3>
      <div className="flex flex-wrap gap-4 mt-4">
      {Object.entries(features).map(([key, enabled]) =>
        enabled ? (
          <div key={key} className="flex items-center gap-2">
            {featureIconMap[key]?.()}
            <span className="text-zinc-600 dark:text-zinc-400">{formatFeatureName(key)}</span>
          </div>
        ) : null
      )}
    </div>
    </div>
    
  )
}