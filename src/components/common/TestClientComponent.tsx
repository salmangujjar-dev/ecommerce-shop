"use client";

import { Button } from "@ui/button";

import useBearStore from "@store/bear";

import { trpc } from "~trpc/client";

const BearCounter = () => {
  const bears = useBearStore((state) => state.bears);

  return <h1>{bears} bears around here...</h1>;
};

BearCounter.whyDidYouRender = true;

const Controls = () => {
  const increasePopulation = useBearStore((state) => state.increasePopulation);

  return <Button onClick={increasePopulation}>One up</Button>;
};

const Greeting = () => {
  const hello = trpc.hello.useQuery({ text: "client" });

  return <h1>{hello.data?.greeting}</h1>;
};

const TestClientComponent = () => {
  return (
    <div>
      <Greeting />
      <BearCounter />
      <Controls />
      <Button href="/dashboard">Dashboard</Button>
    </div>
  );
};

TestClientComponent.whyDidYouRender = true;

export default TestClientComponent;
