import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialCard({ quote, author, position, image }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full min-h-[250px] md:min-h-[280px]">
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="mb-4 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 opacity-50"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 1-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <p className="mb-4 text-sm flex-grow">{quote}</p>

        {/* Author Section Fixed at Bottom */}
        <div className="mt-auto flex items-center gap-4 border-t pt-4">
          {/* Ensuring a Perfect Circle */}
          <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300">
            <Image
              src={
                image ||
                "https://fakeimg.pl/600x400?text=Photo+not+found"
              }
              alt={author}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold leading-tight break-words">{author}</h4>
            <p className="text-xs text-muted-foreground leading-tight break-words">{position}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
