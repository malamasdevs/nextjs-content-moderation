import Header from "@/components/header/Header";
import ImageModerator from "@/components/image-moderator/ImageModerator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <ImageModerator />
    </div>
  );
}
