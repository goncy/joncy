import {Text} from "@chakra-ui/react";

const ErrorScreen: React.FC = () => {
  return (
    <Text fontSize="2xl" paddingX={4} paddingY={12} textAlign="center" textStyle="soft">
      No se encontró la página que estás buscando, si crees que es un error, intentá de nuevo más
      tarde.
    </Text>
  );
};

export default ErrorScreen;
