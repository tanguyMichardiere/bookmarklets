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
        <link rel="stylesheet" href="modern-normalize.css" />
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
