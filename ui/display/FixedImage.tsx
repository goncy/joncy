import Image from "next/image";
import {chakra} from "@chakra-ui/react";

const FixedImage = chakra(Image, {
  baseStyle: {
    backgroundColor: "white",
  },
  shouldForwardProp: (prop) =>
    ["src", "width", "height", "layout", "placeholder", "blurDataURL"].includes(prop),
});

export default FixedImage;
