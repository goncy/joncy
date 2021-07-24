import {extendTheme, theme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

export default extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
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
        ".chakra-ui-light &": {
          borderColor: "blackAlpha.200",
        },
        ".chakra-ui-dark &": {
          borderColor: "whiteAlpha.300",
        },
      },
    },
  },
  layerStyles: {
    card: {
      ".chakra-ui-light &": {
        backgroundColor: "white",
      },
      ".chakra-ui-dark &": {
        backgroundColor: "gray.800",
      },
    },
    "featured-card": {
      ".chakra-ui-light &": {
        backgroundColor: "primary.50",
      },
      ".chakra-ui-dark &": {
        backgroundColor: "primary.900",
      },
    },
    container: {
      ".chakra-ui-light &": {
        backgroundColor: "white",
        borderColor: "blackAlpha.200",
      },
      ".chakra-ui-dark &": {
        borderColor: "whiteAlpha.300",
        backgroundColor: "gray.800",
      },
    },
  },
  textStyles: {
    soft: {
      ".chakra-ui-light &": {
        color: "blackAlpha.600",
      },
      ".chakra-ui-dark &": {
        color: "whiteAlpha.600",
      },
    },
  },
});
