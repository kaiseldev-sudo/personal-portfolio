import { Badge } from "@/components/ui/badge"

export function Skills() {
  return (
    <section id="skills" className="w-full bg-background py-12 md:py-24 lg:py-32 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Technical Skills
            </h2>
            <p className="text-muted-foreground sm:text-lg">
              I've worked with a wide range of technologies across the full stack, focusing on building performant
              and accessible web applications.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="space-y-2">
              <h3 className="font-bold">Frontend Development</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-500 text-white">React</Badge>
                <Badge variant="outline" className="bg-black text-white">Next.js</Badge>
                <Badge variant="outline" className="bg-blue-700 text-white">TypeScript</Badge>
                <Badge variant="outline" className="bg-yellow-500 text-black">JavaScript</Badge>
                <Badge variant="outline" className="bg-orange-500 text-white">HTML5</Badge>
                <Badge variant="outline" className="bg-blue-600 text-white">CSS3</Badge>
                <Badge variant="outline" className="bg-teal-500 text-white">Tailwind CSS</Badge>
                <Badge variant="outline" className="bg-purple-700 text-white">Redux</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Backend Development</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-600 text-white">Node.js</Badge>
                <Badge variant="outline" className="bg-gray-700 text-white">Express</Badge>
                <Badge variant="outline" className="bg-yellow-400 text-black">Python</Badge>
                <Badge variant="outline" className="bg-blue-500 text-white">REST APIs</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Database & Cloud</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-800 text-white">PostgreSQL</Badge>
                <Badge variant="outline" className="bg-green-500 text-white">MongoDB</Badge>
                <Badge variant="outline" className="bg-yellow-500 text-black">Firebase</Badge>
                <Badge variant="outline" className="bg-blue-600 text-white">Docker</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Tools & Practices</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-orange-600 text-white">Git</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
