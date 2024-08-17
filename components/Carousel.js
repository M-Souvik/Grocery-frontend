import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Divide } from "lucide-react"
import Image from "next/image"

const CarouselSlider = () => {
  return (
    <div className="container">
        <Carousel>
    <CarouselContent>
      <CarouselItem>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-gradient-to-br from-blue-500 via-blue-700 to-green-200 rounded-lg p-10 w-full md:h-400 h-fit">
          <div className="flex flex-col items-start justify-center shrink-0">
            <h1 className="font-bold text-sm md:text-6xl">Fruit Sale</h1>
            <p className="text-xs md:text-lg">Get the freshest fruits at a 40% discount!</p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md text-xs md:text-base">Buy Now</button>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Image src="/assets/Fruits.png" alt="Fruit Sale Banner" width={900} height={300} className='w-full h-full object-cover'/>
            <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-lg">50% OFF</div>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-gradient-to-br from-green-500 via-green-700 to-yellow-200 rounded-lg p-10 w-full md:h-400 h-fit">
          <div className="flex flex-col items-start justify-center shrink-0">
            <h1 className="font-bold text-sm md:text-6xl">Vegetable Sale</h1>
            <p className="text-xs md:text-lg">Get the freshest vegetables at a 50% discount!</p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md text-xs md:text-base">Buy Now</button>
          </div>
          <div className="relative w-full md:w-auto">
            <Image src="/assets/Vegetable.png" alt="Vegetable Sale Banner" width={900} height={300} className='w-full h-full object-cover'/>
            <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-lg">50% OFF</div>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-gradient-to-br from-amber-400 to-amber-700 rounded-lg p-10 w-full md:h-400 h-fit">
          <div className="flex flex-col items-start justify-center shrink-0">
            <h1 className="font-bold text-sm md:text-6xl">Dry Fruits Sale</h1>
            <p className="text-xs md:text-lg">Get the freshest dry fruits at a 20% discount!</p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md text-xs md:text-base">Buy Now</button>
          </div>
          <div className="relative w-full md:w-auto">
            <Image src="/assets/Dryfruits.png" alt="Fruit Sale Banner" width={900} height={300} className='w-full h-full object-cover'/>
            <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-lg">20% OFF</div>
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>  
    </div>
    
  )
}

export default CarouselSlider