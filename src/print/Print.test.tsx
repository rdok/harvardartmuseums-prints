import React from "react";
import { render, screen } from "@testing-library/react";
import { Print } from "./Print";
import { Objects_objects_data } from "../graphql/__generated__/Objects";

test("renders a print title", () => {
  const print = makePrint();
  render(<Print print={print} />);
  const linkElement = screen.getByText(print.title);
  expect(linkElement).toBeInTheDocument();
});

test("renders verification level", () => {
  const print = makePrint();
  render(<Print print={print} />);
  const linkElement = screen.getByText(
    print.verificationLevelDescription as string,
    { exact: false }
  );
  expect(linkElement).toBeInTheDocument();
});

function makePrint() {
  const print: Objects_objects_data = {
    __typename: "ObjectResource",
    id: "123",
    rank: 123,
    primaryImageUrl: null,
    title: "Title",
    url: "https://url.com",
    dateBegin: null,
    division: "Division",
    technique: "Technique",
    verificationLevelDescription: "LoremIpsumVerLevlDesc",
  };
  return print;
}
