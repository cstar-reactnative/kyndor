import React from "react";
import { Header } from "react-native-elements";

export const HeaderNav = () => {
  return (
    <Header
      statusBarProps={{ barStyle: "light-content" }}
      outerContainerStyles={{ backgroundColor: "#511fb2" }}
      centerComponent={{
        text: "Notifications",
        style: {
          fontWeight: "bold",
          fontStyle: "normal",
          fontSize: 16,
          letterSpacing: 0.3,
          color: "#fff"
        }
      }}
    />
  );
};
