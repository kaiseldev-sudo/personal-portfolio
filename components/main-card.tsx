import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GeometricLine } from "./geometric-line";
import { ArrowRight, MapPin, ChevronsDown } from "lucide-react";

export function Main() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden bg-background">
      <GeometricLine />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="inline-flex text-white">Available for Work</Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hi, I'm <span className="text-primary">Jayson Reales</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Full-Stack Developer specializing in building exceptional digital experiences that are fast,
                accessible, and responsive.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link href="#projects" className="text-white">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>Albay, Philippines (Open to Remote)</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-square overflow-hidden rounded-full border-8 border-muted md:w-[450px]">
              <Image
                src="/photo2.jpg?height=500&width=500"
                alt="Developer Portrait"
                width={500}
                height={500}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground animate-bounce">
        <span className="text-sm">Scroll Down</span>
        <ChevronsDown className="h-6 w-6" />
      </div>
    </section>
  );
}
