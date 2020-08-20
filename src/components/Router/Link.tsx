import React from "react";
import {
	Link as RouterLink,
	LinkProps as RouterLinkProps,
} from "react-router-dom";

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
	(props, ref) => <RouterLink {...props} innerRef={ref} />,
);

export default Link;
