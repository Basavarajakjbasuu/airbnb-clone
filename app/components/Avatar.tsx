'use client'

import Image from "next/image"

interface AvatarProps {
  src: string | null | undefined ;
}
const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <Image
      className="rounded-full bg-gray-600"
      height={30}
      width={30}
      alt="avatar"
      src={ src || "/images/avatar.jpg"}
    />
  )
}

export default Avatar