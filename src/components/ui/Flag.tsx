import {
  getNationToCode,
  getNationalityToCode,
} from "../../utils/nationalityCode";

// Pass the country ("Italy") or the nationality ("Italian") from the API.
// Unknown names render nothing instead of requesting a missing image.
// The flag is decorative next to text; pass `alt` when it stands on its own.
type FlagProps = ({ country: string } | { nationality: string }) & {
  alt?: string;
};

const Flag = (props: FlagProps) => {
  const code =
    "country" in props
      ? getNationToCode(props.country)
      : getNationalityToCode(props.nationality);

  if (!code) return null;

  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={props.alt ?? ""}
      className="flag"
      loading="lazy"
    />
  );
};

export default Flag;
