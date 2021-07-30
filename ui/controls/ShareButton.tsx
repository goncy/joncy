import React from "react";
import {Button, ButtonProps} from "@chakra-ui/react";

interface Props extends Omit<ButtonProps, "onCopy"> {
  onShare: (share: Navigator["share"]) => void;
  onCopy: (copy: Navigator["clipboard"]["writeText"]) => void;
}

function ShareButton({onShare, onCopy, ...props}: Props): JSX.Element {
  const isSharedEnabled = process.browser && (navigator?.share || navigator?.clipboard);

  function handleShare() {
    if (navigator?.share) {
      onShare(navigator.share);
    } else if (navigator?.clipboard) {
      onCopy(navigator.clipboard.writeText);
    }

    throw new Error("Hubo un error compartiendo la oportunidad");
  }

  return isSharedEnabled ? <Button onClick={handleShare} {...props} /> : null;
}

export default ShareButton;
