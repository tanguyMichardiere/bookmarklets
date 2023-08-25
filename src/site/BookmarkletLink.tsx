type Props = {
  code: string;
  filename: string;
};

export default function BookmarkletLink(props: Props): JSX.Element {
  return (
    <a
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white no-underline transition-colors duration-100 hover:bg-blue-700"
      href={`javascript:{${props.code}}`}
    >
      {props.filename.replace(".ts", "")}
    </a>
  );
}
