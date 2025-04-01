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
            title="Solana Staking"
            description="A decentralized application for staking Solana tokens and earning rewards."
            image="./images/solana.png"
            tags={["React", "JavaScript", "Solidity"]}
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            title="APCIA Ecommerce with Blockchain Payment"
            description="An e-commerce platform integrated with blockchain technology for secure and transparent payments."
            image="./images/apcia.jpg"
            tags={["PHP", "MySQL", "JavaScript", "Solidity"]}
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            title="Banking App"
            description="Horizon is a modern banking platform for everyone."
            image="./images/banking.png"
            tags={["React", "TypeScript"]}
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            title="Enrolment & Grading System"
            description="A comprehensive enrollment system for educational institutions to manage student registrations and courses."
            image="./images/enrollment.png"
            tags={["PHP", "MySQL", "JavaScript",]}
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            title="Kapuntukan E-Commerce"
            description="An online ordering system for Kapuntukan Restobar with integrated payment solutions."
            image="./images/kapuntukan.png"
            tags={["PHP", "MySQL", "JavaScript",]}
            demoUrl="#"
            repoUrl="#"
          />
          <ProjectCard
            title="Cat Town Calculator"
            description="A fun simulator game for generating and managing a virtual cat town."
            image="./images/cat-town-calc.png"
            tags={["React", "JavaScript", "Solidity"]}
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
