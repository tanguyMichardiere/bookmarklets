import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Bookmarklets</title>
        <link href="modern-normalize.css" rel="stylesheet" />
        <link href="style.css" rel="stylesheet" />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
