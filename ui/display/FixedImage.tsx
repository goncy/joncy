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
      "alt",
      "onLoadingComplete",
      "placeholder",
    ].includes(prop),
});

function FixedImage(props: Props): JSX.Element {
  const [isLoaded, toggleLoaded] = React.useState(false);

  return (
    <Factory
      {...props}
      filter={isLoaded ? "grayscale(0) blur(0)" : "grayscale(1) blur(12px)"}
      transition="filter .5s"
      onLoadingComplete={() => toggleLoaded(true)}
    />
  );
}

export default FixedImage;
