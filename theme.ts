import {extendTheme, theme} from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: theme.colors.purple,
  },
  styles: {
    global: {
      body: {
        minHeight: "100vh",
        background: "url(/assets/banner.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "start",
        backgroundSize: "100% 200px",
        backgroundColor: "gray.50",
        padding: {
          base: 0,
          md: 4,
        },
      },
    },
  },
  components: {
    Button: {
      variants: {
        ghost: {
          bg: "primary.50",
          color: "primary.500",
          _hover: {
            bg: "primary.500",
            color: "white",
          },
        },
      },
    },
  },
});
