import { Fragment } from "react";

// Renders **bold** segments of a translated string as <strong>
const RichText = ({ text }: { text: string }) => (
  <>
    {text.split("**").map((part, index) =>
      index % 2 ? (
        <strong key={index}>{part}</strong>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      ),
    )}
  </>
);

export default RichText;
