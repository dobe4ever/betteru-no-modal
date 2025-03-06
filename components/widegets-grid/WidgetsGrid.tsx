"use client"

import { PromoCard } from "./promo-card/PromoCard"
import { HabitsSheet } from "./habits/HabitsSheet"
import { TodosDrawer } from "./todos/TodosDrawer"
import { CheckinDrawer } from "./checkin/CheckinDrawer"
import { AnalyticsDrawer } from "./analytics/AnalyticsDrawer"
import { WheelDrawer } from "./wheel/WheelDrawer"
import { BadgesDrawer } from "./badges/BadgesDrawer"
import { AdsWidget } from "./ads/AdsWidget"
import { ShopDrawer } from "./shop/ShopDrawer"
import { CoursesDrawer } from "./courses/CoursesDrawer"

export function WidgetsGrid() {
  return (
    <div className="flex flex-col overflow-hidden w-full bg-white p-2 gap-2 rounded-t-xl">
      <PromoCard />
      <HabitsSheet />
      <TodosDrawer />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <CheckinDrawer />
        </div>
        <div>
          <AnalyticsDrawer />
        </div>
        <div>
          <WheelDrawer />
        </div>
        <div>
          <BadgesDrawer />
        </div>
      </div>
      <AdsWidget />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <ShopDrawer />
        </div>
        <div>
          <CoursesDrawer />
        </div>
      </div>
    </div>
  )
}

