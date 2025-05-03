"use client";

import { trpc } from "~trpc/client";

export default function Greeting() {
  const hello = trpc.hello.useQuery({ text: "client" });
  return <h1>{hello.data?.greeting}</h1>;
}
