import BookmarkletLink from "./BookmarkletLink";
import SourceLink from "./SourceLink";

type Props = {
  srcDir: string;
  repositoryUrl: string;
  results: [string, string][];
};

export default function Page(props: Props): JSX.Element {
  return (
    <main className="page">
      <h1>Bookmarklets</h1>
      <ul className="bookmarklet-list">
        {props.results.map(([filename, code]) => (
          <li key={filename} className="bookmarklet">
            <BookmarkletLink code={code} filename={filename} />
            <SourceLink
              repositoryUrl={props.repositoryUrl}
              srcDir={props.srcDir}
              filename={filename}
            />
          </li>
        ))}
      </ul>
      <a href={`${props.repositoryUrl}`} target="_blank">
        {props.repositoryUrl.replace("https://", "")}
      </a>
    </main>
  );
}
