import {extendTheme, theme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

export default extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    primary: theme.colors.purple,
  },
  styles: {
    global: (props) => ({
      body: {
        minHeight: "100vh",
        background: "url(/assets/banner.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "start",
        backgroundSize: "100% 200px",
        backgroundColor: mode("gray.50", "gray.900")(props),
        padding: {
          base: 0,
          md: 4,
        },
      },
    }),
  },
  components: {
    Divider: {
      baseStyle: {
        opacity: 1,
        borderColor: "blackAlpha.200",
        ".chakra-ui-dark &": {
          borderColor: "whiteAlpha.300",
        },
      },
    },
    Badge: {
      variants: {
        outline: (props) => ({
          color: mode(`${props.colorScheme}.600`, `${props.colorScheme}.200`)(props),
          borderColor: mode(`${props.colorScheme}.500`, `${props.colorScheme}.200`)(props),
        }),
      },
    },
  },
  layerStyles: {
    card: {
      backgroundColor: "white",
      ".chakra-ui-dark &": {
        backgroundColor: "gray.800",
      },
    },
    "featured-card": {
      backgroundColor: "primary.50",
      ".chakra-ui-dark &": {
        backgroundColor: "primary.900",
      },
    },
    container: {
      backgroundColor: "white",
      borderColor: "blackAlpha.200",
      ".chakra-ui-dark &": {
        borderColor: "whiteAlpha.300",
        backgroundColor: "gray.800",
      },
    },
  },
  textStyles: {
    soft: {
      color: "blackAlpha.700",
      ".chakra-ui-dark &": {
        color: "whiteAlpha.700",
      },
    },
    link: {
      color: "primary.500",
      ".chakra-ui-dark &": {
        color: "primary.400",
      },
    },
  },
});
