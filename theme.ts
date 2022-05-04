import {extendTheme, theme} from "@chakra-ui/react";

export default extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    primary: theme.colors.purple,
    secondary: theme.colors.whatsapp,
  },
  components: {
    Button: {
      variants: {
        link: (props) => ({
          color: `${props.colorScheme}.700`,
          _dark: {
            color: `${props.colorScheme}.200`,
          },
        }),
      },
    },
    Divider: {
      baseStyle: {
        opacity: 1,
        borderColor: "blackAlpha.200",
        _dark: {
          borderColor: "whiteAlpha.300",
        },
      },
    },
    Badge: {
      variants: {
        outline: (props) => ({
          color: `${props.colorScheme}.700`,
          boxShadow: `inset 0 0 0px 1px ${props.theme["colors"][props.colorScheme][700]}`,
          _dark: {
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
      _dark: {
        backgroundColor: "gray.800",
      },
    },
    "featured-card": {
      backgroundColor: "primary.50",
      _dark: {
        backgroundColor: "primary.900",
      },
    },
    container: {
      backgroundColor: "white",
      borderColor: "blackAlpha.200",
      _dark: {
        borderColor: "whiteAlpha.300",
        backgroundColor: "gray.800",
      },
    },
  },
  textStyles: {
    soft: {
      color: "blackAlpha.700",
      _dark: {
        color: "whiteAlpha.700",
      },
    },
    link: {
      "&": {
        color: "primary.500",
      },
      _dark: {
        color: "primary.400",
      },
    },
    success: {
      color: "green.600",
      _dark: {
        color: "green.300",
      },
    },
  },
});
