import { Fragment } from "react";

// **bold** or [label](url)
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/;
const SAFE_HREF = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i;

// Renders the small markup allowed in translated text: **bold** segments
// as <strong> and [label](url) as links (external ones open in a new tab)
const RichText = ({ text }: { text: string }) => (
  <>
    {text.split(TOKEN).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      // Only web, mail and in-site links: a "javascript:" URL in a
      // translation would otherwise run code on click
      if (link && SAFE_HREF.test(link[2])) {
        const [, label, href] = link;
        const external = href.startsWith("http");
        return (
          <a
            key={index}
            href={href}
            className="text-link"
            {...(external && { target: "_blank", rel: "noreferrer" })}
          >
            {label}
          </a>
        );
      }
      return <Fragment key={index}>{part}</Fragment>;
    })}
  </>
);

export default RichText;
