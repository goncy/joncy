import Image from "next/image";
import {chakra} from "@chakra-ui/react";

const FixedImage = chakra(Image, {
  shouldForwardProp: (prop) => ["src", "width", "height", "layout"].includes(prop),
});

export default FixedImage;
