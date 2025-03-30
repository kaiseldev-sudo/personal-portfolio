import { TestimonialCard } from "@/components/testimonial-card"

export function Testimonial() {
  return (
        <section id="testimonials" className="w-full bg-background py-12 md:py-24 lg:py-32 border-t">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Client Testimonials
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                What clients and colleagues have to say about working with me.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="Jayson transformed our outdated website into a modern, user-friendly platform that's increased our conversion rate by 40%. Their technical expertise and attention to detail were exceptional."
                author="Sarah Johnson"
                position="CEO, TechStart Inc."
                image="https://images.pexels.com/photos/3755824/pexels-photo-3755824.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <TestimonialCard
                quote="Working with Jayson was a game-changer for our team. They quickly understood our complex requirements and delivered a solution that exceeded our expectations, all while maintaining clear communication throughout the project."
                author="Michael Rodriguez"
                position="CTO, FinanceFlow"
                image="https://images.pexels.com/photos/7691739/pexels-photo-7691739.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <TestimonialCard
                quote="Jayson's ability to translate our vision into a functional, beautiful web application was impressive. Their code is clean, well-documented, and the performance optimizations they implemented made a noticeable difference."
                author="Jennifer Lee"
                position="Product Manager, HealthTech LTD."
                image="https://images.pexels.com/photos/3755824/pexels-photo-3755824.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <TestimonialCard
                quote="We hired Jayson to rebuild our e-commerce platform during our busiest season, and they delivered a flawless experience on time and on budget. Their technical skills are matched by their professionalism and reliability."
                author="David Chen"
                position="Director of Digital, Retail Innovations"
                image="https://images.pexels.com/photos/7691739/pexels-photo-7691739.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <TestimonialCard
                quote="Jayson brought both technical expertise and creative solutions to our project. They were responsive, detail-oriented, and genuinely cared about the success of our application."
                author="Emily Wilson"
                position="Founder, CreativeSpace"
                image="https://images.pexels.com/photos/3755824/pexels-photo-3755824.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <TestimonialCard
                quote="I've worked with many developers, but Jayson stands out for their problem-solving abilities and commitment to quality. They're not just a coder, but a thoughtful engineer who considers the bigger picture."
                author="Robert Taylor"
                position="Engineering Lead, TechGiant"
                image="https://images.pexels.com/photos/7691739/pexels-photo-7691739.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
          </div>
        </section>
  )
}