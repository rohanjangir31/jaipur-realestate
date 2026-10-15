import { useEffect } from 'react';

/**
 * Custom hook to dynamically manage document title, meta description, and canonical tags for SEO.
 */
export function usePageMeta({ title, description, canonical }) {
  useEffect(() => {
    // 1. Update title
    const fullTitle = title
      ? `${title} | Jaipur Estates`
      : 'Jaipur Estates | Properties, Commercial Investments & Heritage Stays in Jaipur';
    document.title = fullTitle;

    // 2. Update description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }

    // 3. Update canonical link
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonical;
    }
  }, [title, description, canonical]);
}
