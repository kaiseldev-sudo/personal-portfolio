import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define a mapping of tags to colors
const tagColors = {
  "Next.js": "bg-black text-white",
  "TypeScript": "bg-blue-600 text-white",
  "Stripe": "bg-purple-600 text-white",
  "PostgreSQL": "bg-blue-800 text-white",
  "React": "bg-blue-500 text-white",
  "Node.js": "bg-green-600 text-white",
  "GraphQL": "bg-pink-500 text-white",
  "MongoDB": "bg-green-700 text-white",
  "Django": "bg-green-900 text-white",
  "AWS": "bg-yellow-500 text-black",
  "D3.js": "bg-orange-600 text-white",
  "Express": "bg-gray-700 text-white",
  "Firebase": "bg-amber-500 text-black",
  "Python": "bg-yellow-400 text-black",
  "TensorFlow": "bg-orange-500 text-white",
  "WebSockets": "bg-teal-500 text-white",
  "JavaScript": "bg-yellow-500 text-black",
  "Solidity": "bg-black text-white",
  "PHP": "bg-orange-600 text-white",
  "MySQL": "bg-[#00758f] text-white",
};

export function ProjectCard({ title, description, image, tags, demoUrl, repoUrl }) {
  return (
    <Card className="overflow-hidden max-w-[350px] min-h-[450px] flex flex-col">
      {/* Image Section */}
      <div className="w-full h-[200px] overflow-hidden">
        <Image
          src={image || "https://fakeimg.pl/600x400?text=Photo+not+found"}
          alt={title}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant='outline' className={`text-[10px] px-2 py-1 rounded ${tagColors[tag] || "bg-gray-300 text-black"}`}>
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

