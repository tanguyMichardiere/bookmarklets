import { encode } from "he";

type Props = {
  code: string;
  filename: string;
};

export default function BookmarkletLink(props: Props): JSX.Element {
  return (
    <a className="bookmarklet-link" href={`javascript:{${encode(props.code)}}`}>
      {props.filename.replace(".ts", "")}
    </a>
  );
}
