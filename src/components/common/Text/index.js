import React from 'react';
import { Text } from "react-native";

const _Text = (props) => (
	<Text allowFontScaling={false} {...props} >{props.children}</Text>
);

export default _Text;