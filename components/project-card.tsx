import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ title, description, image, tags, demoUrl, repoUrl }) {
  return (
    <Card className="overflow-hidden max-w-[350px] min-h-[450px] flex flex-col">
      {/* Image Section */}
      <div className="aspect-video w-full overflow-hidden max-h-[200px]">
        <Image
          src={image || "https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=600"}
          alt={title}
          width={400}
          height={200}
          className="object-cover transition-all hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button size="sm" variant="outline" asChild>
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> Code
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
