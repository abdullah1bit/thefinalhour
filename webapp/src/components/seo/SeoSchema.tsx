import React from "react";

type SchemaType = "WebSite" | "EventSeries" | "CollectionPage";

interface SeoSchemaProps {
    type: SchemaType;
    data: any;
}

export default function SeoSchema({ type, data }: SeoSchemaProps) {
    let schema = {};

    if (type === "WebSite") {
        schema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "The Final Hour",
            "url": "https://thefinalhour.vercel.app/",
            "description": "An educational journey through Islamic prophecies — signs fulfilled, unfolding, and approaching.",
            "inLanguage": ["en", "ar"],
        };
    } else if (type === "CollectionPage") {
        schema = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Signs of the End Times in Islam",
            "description": "A comprehensive collection of minor and major signs of the Hour, based on authentic hadith.",
            "about": {
                "@type": "Thing",
                "name": "Islamic Eschatology"
            }
        }
    } else if (type === "EventSeries") {
        // Generate Event sequence from timeline data
        const events = data?.map((event: any, index: number) => ({
            "@type": "Event",
            "name": event.title,
            "description": event.description || event.shortDesc,
            "eventStatus": "https://schema.org/EventScheduled",
            "position": index + 1
        })) || [];

        schema = {
            "@context": "https://schema.org",
            "@type": "EventSeries",
            "name": "The Sequence of the Final Hour",
            "description": "The prophesied order of major eschatological events in Islam.",
            "subEvent": events
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
