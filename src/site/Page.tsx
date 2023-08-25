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
    <main className="page">
      <h1>Bookmarklets</h1>
      <ul className="bookmarklet-list">
        {props.results.map(([filename, code]) => (
          <li className="bookmarklet" key={filename}>
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
      <a href={`${props.repositoryUrl}`} rel="noreferrer" target="_blank">
        {props.repositoryUrl.replace("https://", "")}
      </a>
    </main>
  );
}
