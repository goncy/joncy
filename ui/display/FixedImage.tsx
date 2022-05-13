import * as React from "react";
import Image, {ImageProps as NextImageProps} from "next/image";
import {Box, chakra, ImageProps as ChakraImageProps} from "@chakra-ui/react";

type Props = ChakraImageProps & NextImageProps;

const Factory = chakra(Image, {
  baseStyle: {
    backgroundColor: "white",
  },
  shouldForwardProp: (prop) =>
    [
      "src",
      "width",
      "height",
      "layout",
      "blurDataURL",
      "aria-label",
      "alt",
      "onLoadingComplete",
      "placeholder",
    ].includes(prop),
});

function FixedImage(props: Props): JSX.Element {
  const [isLoading, toggleLoading] = React.useState(true);

  return (
    <Box
      borderRadius={props.borderRadius}
      height={`${props.height}px`}
      overflow="hidden"
      width={`${props.width}px`}
    >
      <Factory
        {...props}
        filter={isLoading ? "grayscale(1) blur(12px)" : "grayscale(0) blur(0)"}
        height={props.height}
        transition="filter .5s"
        width={props.width}
        onLoadingComplete={() => toggleLoading(false)}
      />
    </Box>
  );
}

export default FixedImage;
