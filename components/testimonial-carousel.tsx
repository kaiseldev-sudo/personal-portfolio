"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

interface Testimonial {
  quote: string
  author: string
  position: string
  image: string
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="testimonial-carousel-container w-full max-w-6xl mx-auto px-4 py-8">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <TestimonialCard
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              image={testimonial.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

// Update the TestimonialCard function to fix the circular image issue

function TestimonialCard({ quote, author, position, image }: Testimonial) {
  return (
    <Card className="overflow-hidden bg-background/80 backdrop-blur-sm border-2 border-primary/10 h-full max-w-md mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <CardContent className="p-8">
        <div className="mb-6 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 opacity-50"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <p className="mb-6 text-lg leading-relaxed">{quote}</p>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20 flex-shrink-0">
            <Image
              src={image || "https://fakeimg.pl/600x400?text=Photo+not+found"}
              alt={author}
              width={64}
              height={64}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div>
            <h4 className="font-bold text-lg">{author}</h4>
            <p className="text-sm text-muted-foreground">{position}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

