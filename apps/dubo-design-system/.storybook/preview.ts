import * as React from "react";
import type { Preview, Decorator } from "@storybook/react-vite";
import "../src/app/globals.css";
import "./storybook-fonts.css";

// Dark mode decorator — toggles .dark class on html based on selected background
const withDarkMode: Decorator = (Story, context) => {
  const bg = context.globals?.backgrounds?.value;
  const isDark = bg === "#070D14";

  if (typeof document !== "undefined") {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return React.createElement(React.Fragment, null, React.createElement(Story));
};

const preview: Preview = {
  decorators: [withDarkMode],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#F5F7FB" },
        { name: "white", value: "#FFFFFF" },
        { name: "dark", value: "#070D14" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
