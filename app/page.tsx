import { Header } from "@/components/header-card"
import { Main } from "@/components/main-card"
import { Contact } from "@/components/contact"
import { Skills } from "@/components/skills-card"
import { About } from "@/components/about-card"
import { Testimonial } from "@/components/testimonial"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"

export default function Portfolio() {
  return (
    <div className="flex min-h-screen flex-col transition-theme">
      <Header />
      <main className="flex-1 relative">
        <Main />
        <About />
        <Skills />
        <Projects />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}