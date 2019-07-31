import React from "react";
import { TextInput } from "react-native";

const Input = props => (
  <TextInput
    underlineColorAndroid="transparent"
    selectionColor={AppColors.themeColor}
    {...props}
  />
);

export default Input;
