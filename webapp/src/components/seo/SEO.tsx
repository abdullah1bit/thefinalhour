import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
}

export function SEO({ title, description, path = '/' }: SEOProps) {
    const defaultTitle = 'The Final Hour | Signs of the End Times in Islam';
    const defaultDesc = 'Explore the signs of the end times in Islam — what has come true, what is unfolding, and what is yet to come. Based on authentic hadith and Quranic sources.';

    const siteUrl = 'https://thefinalhour.vercel.app';

    const currentTitle = title ? `${title} | The Final Hour` : defaultTitle;
    const currentDesc = description || defaultDesc;
    const canonicalUrl = `${siteUrl}${path}`;

    return (
        <Helmet>
            <title>{currentTitle}</title>
            <meta name="description" content={currentDesc} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:title" content={currentTitle} />
            <meta property="og:description" content={currentDesc} />
            <meta property="og:url" content={canonicalUrl} />

            <meta name="twitter:title" content={currentTitle} />
            <meta name="twitter:description" content={currentDesc} />
        </Helmet>
    );
}
