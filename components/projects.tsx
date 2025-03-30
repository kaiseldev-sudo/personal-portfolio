import { ArrowRight } from "lucide-react"
import { ProjectCard } from "./project-card"
import { Button } from "./ui/button"
import Link from "next/link"

export function Projects() {
  return (
    <section id="projects" className="w-full bg-muted py-12 md:py-24 lg:py-32 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            A selection of my recent work across different industries and technologies.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title="E-Commerce Platform"
            description="A full-featured online store with payment processing, inventory management, and analytics dashboard."
            image="https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=600"
            tags={["Next.js", "TypeScript", "Stripe", "PostgreSQL"]}
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            title="Health & Fitness App"
            description="Mobile-first web application for tracking workouts, nutrition, and health metrics with personalized recommendations."
            image="https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=600"
            tags={["React", "Node.js", "GraphQL", "MongoDB"]}
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            title="Real Estate Platform"
            description="Property listing and management system with advanced search, virtual tours, and agent portals."
            image="https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=600"
            tags={["React", "Django", "PostgreSQL", "AWS"]}
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            title="Financial Dashboard"
            description="Interactive analytics dashboard for financial data visualization and reporting with real-time updates."
            image="https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=600"
            tags={["React", "D3.js", "Express", "Firebase"]}
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            title="Content Management System"
            description="Custom CMS built for a media company with workflow automation and content scheduling."
            image="https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=600"
            tags={["Next.js", "TypeScript", "Node.js", "MongoDB"]}
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            title="AI-Powered Chat Application"
            description="Real-time messaging platform with AI-powered features like translation, summarization, and content moderation."
            image="https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=600"
            tags={["React", "WebSockets", "Python", "TensorFlow"]}
            demoUrl="#"
            repoUrl="#"
          />
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
