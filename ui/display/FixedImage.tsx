import * as React from "react";
import Image, {ImageProps as NextImageProps} from "next/image";
import {chakra, ImageProps as ChakraImageProps} from "@chakra-ui/react";

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
    <Factory
      {...props}
      filter={isLoading ? "grayscale(1) blur(12px)" : "grayscale(0) blur(0)"}
      transition="filter .5s"
      onLoadingComplete={() => toggleLoading(false)}
    />
  );
}

export default FixedImage;
