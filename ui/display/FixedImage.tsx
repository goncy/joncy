import Image from "next/image";
import {chakra} from "@chakra-ui/react";

const OptimizedImage = chakra(Image, {
  shouldForwardProp: (prop) => ["src", "width", "height"].includes(prop),
});

export default OptimizedImage;
