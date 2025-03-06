// components/header/user-card/UserCard.tsx

import { BigAvatar } from "./BigAvatar"
import { BigDate } from "./BigDate"
import { ShapesBG } from "./ShapesBG"

export function UserCard() {
  return (
    <>
      <div className="">
        <BigAvatar />
        <ShapesBG />
      </div>
      <BigDate />
    </>
  )
}

