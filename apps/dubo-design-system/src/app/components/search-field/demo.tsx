"use client";

import * as React from "react";
import { SearchField } from "@/components/ui/search-field";

export function SearchFieldDemo() {
  const [value, setValue] = React.useState("");

  return (
    <SearchField
      placeholder="Search lab orders..."
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue("")}
    />
  );
}

export function SearchFieldFilledValueDemo() {
  const [value, setValue] = React.useState("Amanda");

  return (
    <SearchField
      placeholder="Search patients..."
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue("")}
    />
  );
}
