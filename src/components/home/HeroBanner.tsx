import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[500px] bg-gray-900">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full bg-primary opacity-60 absolute z-10"></div>
        <img 
          src="/images/bg-home.png"
          alt="Nam Phuong Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4 uppercase tracking-wider">
          Công ty TNHH DV Hàng Hải & Vận Tải Biển NAM PHUONG - Uy tín, chất lượng, chuyên nghiệp.
        </h1>
        {/*<p className="text-lg md:text-xl mb-8 max-w-2xl">*/}
        {/*  Công ty TNHH DV Hàng Hải & Vận Tải Biển NAM PHUONG - Uy tín, chất lượng, chuyên nghiệp.*/}
        {/*</p>*/}
        <Link
          href="/lien-he"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors"
        >
          Liên hệ ngay
        </Link>
      </div>
    </section>
  );
}
