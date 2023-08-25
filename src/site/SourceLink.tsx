type Props = {
  repositoryUrl: string;
  srcDir: string;
  bookmarkletsDir: string;
  filename: string;
};

export default function SourceLink(props: Props): JSX.Element {
  return (
    <a
      href={`${props.repositoryUrl}/blob/main/${props.srcDir}/${props.bookmarkletsDir}/${props.filename}`}
      target="_blank"
    >
      source code
    </a>
  );
}
