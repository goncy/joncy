import React from "react";
import {Text} from "@chakra-ui/react";

function OfflineScreen(): JSX.Element {
  return (
    <Text fontSize="2xl" paddingX={4} paddingY={12} textAlign="center" textStyle="soft">
      Parece que no pudimos obtener la información necesaria, intentá de nuevo más tarde.
    </Text>
  );
}

export default OfflineScreen;
