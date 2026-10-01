"use client";
import PhotoCarousel3D from "./PhotoCarousel3D";

export default function GallerySection() {
  const photos = [
    "/photos/dolly-1.jpg", "/photos/dolly-2.jpg", "/photos/dolly-3.jpg",
    "/photos/dolly-4.jpg", "/photos/dolly-5.jpg", "/photos/dolly-6.jpg",
    "/photos/dolly-7.jpg", "/photos/dolly-8.jpg", "/photos/dolly-9.jpg",
    "/photos/dolly-10.jpg", "/photos/dolly-11.jpg", "/photos/dolly-12.jpg",
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-32 overflow-hidden">
      <h2 className="text-white text-4xl md:text-6xl font-light tracking-widest mb-12 text-center px-6">
        Moments I Don't Want To Forget
      </h2>
      <p className="text-gray-500 text-sm tracking-widest uppercase mb-8">
        Drag to rotate · Hover to pause
      </p>
      <div className="w-full h-[500px] md:h-[600px]">
        <PhotoCarousel3D photos={photos} />
      </div>
    </section>
  );
}
