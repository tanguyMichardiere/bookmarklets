import type { ReactNode } from "react";

type Props = {
  cssHash: string;
  children: ReactNode;
};

export default function Layout(props: Props): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Bookmarklets</title>
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link href={`style.${props.cssHash}.css`} rel="stylesheet" />
      </head>
      <body className="p-4">{props.children}</body>
    </html>
  );
}
