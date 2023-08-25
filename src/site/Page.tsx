import BookmarkletLink from "./BookmarkletLink";
import SourceLink from "./SourceLink";

type Props = {
  srcDir: string;
  bookmarkletsDir: string;
  repositoryUrl: string;
  results: Array<[string, string]>;
};

export default function Page(props: Props): JSX.Element {
  return (
    <main className="flex flex-col items-center gap-4">
      <h1 className="text-xl">Bookmarklets</h1>
      <ul className="flex flex-col items-center gap-4">
        {props.results.map(([filename, code]) => (
          <li className="flex flex-col items-center gap-1" key={filename}>
            <BookmarkletLink code={code} filename={filename} />
            <SourceLink
              bookmarkletsDir={props.bookmarkletsDir}
              filename={filename}
              repositoryUrl={props.repositoryUrl}
              srcDir={props.srcDir}
            />
          </li>
        ))}
      </ul>
      <a className="underline" href={`${props.repositoryUrl}`} rel="noreferrer" target="_blank">
        {props.repositoryUrl.replace("https://", "")}
      </a>
    </main>
  );
}
