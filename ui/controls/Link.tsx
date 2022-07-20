import type {LinkProps} from "@chakra-ui/react";

import NextLink from "next/link";
import {Link as ChakraLink} from "@chakra-ui/react";

function Link({href, children, isExternal, ...props}: LinkProps) {
  if (isExternal) {
    return (
      <ChakraLink isExternal href={href} rel="noopener noreferrer nofollow" {...props}>
        {children}
      </ChakraLink>
    );
  }

  return (
    <NextLink passHref href={href}>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  );
}

export default Link;
