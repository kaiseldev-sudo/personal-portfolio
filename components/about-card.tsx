import Link from "next/link"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"

export function About() {
  return (
    <section id="about" className="w-full bg-muted py-12 md:py-24 lg:py-32 relative border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">About Me</h2>
          <div className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            <p className="mb-4">
              With over 8 years of experience in web development, I've worked with a diverse range of clients from
              startups to Fortune 500 companies. My journey began with a Computer Science degree from UC Berkeley,
              followed by roles at innovative tech companies where I honed my skills in building scalable,
              user-focused applications.
            </p>
            <p className="mb-4">
              I'm passionate about creating clean, efficient code and intuitive user experiences. My approach
              combines technical expertise with creative problem-solving to deliver solutions that exceed
              expectations.
            </p>
            <p>
              When I'm not coding, you'll find me hiking in the mountains, experimenting with new cooking recipes,
              or contributing to open-source projects.
            </p>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link href="/resume.pdf" target="_blank">
              <User className="mr-2 h-4 w-4" /> Download Resume
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
