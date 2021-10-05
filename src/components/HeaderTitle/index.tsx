import React from "react";
import { View, Image } from "react-native";

import Logo from "../../images/logo.png";

const HeaderTitle: React.FC = (props) => {
  return <Image style={{ width: 50, height: 50 }} source={Logo} />;
};

export default HeaderTitle;
