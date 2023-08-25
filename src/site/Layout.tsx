import type { ReactNode } from "react";

type Props = {
  cssHash: string;
  children: ReactNode;
};

export default function Layout(props: Props): JSX.Element {
  return (
    <html lang="en">
      <head>
        <title>Bookmarklets</title>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link href={`style.${props.cssHash}.css`} rel="stylesheet" />
      </head>
      <body className="p-4">{props.children}</body>
    </html>
  );
}
