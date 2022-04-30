import {extendTheme, theme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

export default extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    primary: theme.colors.purple,
    secondary: theme.colors.whatsapp,
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
    Button: {
      variants: {
        link: (props) => ({
          color: `${props.colorScheme}.700`,
          ".chakra-ui-dark &": {
            color: `${props.colorScheme}.200`,
          },
        }),
      },
    },
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
          color: `${props.colorScheme}.700`,
          boxShadow: `inset 0 0 0px 1px ${props.theme["colors"][props.colorScheme][700]}`,
          ".chakra-ui-dark &": {
            color: `${props.colorScheme}.200`,
            boxShadow: `inset 0 0 0px 1px ${props.theme["colors"][props.colorScheme][200]}`,
          },
        }),
      },
    },
    Modal: {
      parts: ["dialogContainer"],
      baseStyle: {
        dialogContainer: {
          padding: 4,
        },
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
      "&": {
        color: "primary.500",
      },
      ".chakra-ui-dark &": {
        color: "primary.400",
      },
    },
    success: {
      color: "green.600",
      ".chakra-ui-dark &": {
        color: "green.300",
      },
    },
  },
});
