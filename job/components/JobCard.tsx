import type {Job} from "../types";

import React, {useEffect, useMemo, useState} from "react";
import {
  Stack,
  Text,
  Badge,
  Button,
  Box,
  Wrap,
  WrapItem,
  useToast,
  Link,
  useClipboard,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

import * as analytics from "../../analytics";
import FixedImage from "../../ui/display/FixedImage";
import {compileLink, getLinkTokens, getTokensValues, setTokensValues} from "../utils/link";
interface Props {
  job: Job;
}

function JobCard({job}: Props): JSX.Element {
  const toast = useToast();
  const {onCopy} = useClipboard(`${process.env.NEXT_PUBLIC_URL}/${job.id}`);
  const [isModalShown, toggleModal] = useState<boolean>(false);
  const questions = useMemo(() => getLinkTokens(job.link), [job.link]);
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    typeof window === "undefined" ? {} : getTokensValues(questions),
  );
  const link = useMemo(() => compileLink(job.link, formData), [job.link, formData]);

  function handleApply() {
    analytics.track("click", {
      value: "apply",
      company: job.company,
      position: job.title,
      title: `${job.company} - ${job.title}`,
      featured: job.featured,
      tags: job.tags,
      seniority: job.seniority,
      id: job.id,
    });
  }

  function handleShare() {
    onCopy();

    analytics.track("click", {
      value: "share",
      company: job.company,
      position: job.title,
      title: `${job.company} - ${job.title}`,
      featured: job.featured,
      tags: job.tags,
      seniority: job.seniority,
      id: job.id,
    });

    toast({
      status: "success",
      title: "Bien!",
      description: "El link de la oportunidad fue copiado al portapapeles",
    });
  }

  useEffect(() => {
    setTokensValues(formData);
  }, [formData]);

  return (
    <>
      <Box
        key={job.id}
        as={Box}
        data-testid={job.featured ? "featured-job" : "job"}
        id={job.id}
        layerStyle={job.featured ? "featured-card" : "card"}
        padding={4}
      >
        <Stack spacing={{base: 3, md: 2}}>
          <LinkBox
            alignItems="flex-start"
            as={Stack}
            direction="row"
            justifyContent="space-between"
            spacing={2}
            width="100%"
          >
            <Stack alignItems="flex-start" direction="row" spacing={2}>
              {job.image && (
                <FixedImage
                  alt={`${job.company} logo`}
                  aria-label={`${job.company} logo`}
                  borderRadius="md"
                  height={48}
                  loading="lazy"
                  minWidth={48}
                  objectFit="contain"
                  src={`/api/image?url=${encodeURIComponent(job.image)}`}
                  width={48}
                />
              )}
              <Stack spacing={0}>
                <Text fontSize={{base: "md", md: "sm"}} lineHeight="normal" textStyle="soft">
                  {job.company}
                </Text>
                <LinkOverlay
                  aria-label={job.title}
                  fontSize={{base: "xl", md: "lg"}}
                  fontWeight="500"
                  href={`/${job.id}`}
                  lineHeight="normal"
                >
                  {job.title}
                </LinkOverlay>
              </Stack>
            </Stack>
            {job.featured && (
              <StarIcon
                aria-label="star icon"
                color="yellow.500"
                height={5}
                marginRight={1}
                role="img"
                width={5}
              />
            )}
          </LinkBox>
          {Boolean(job.tags.length) && (
            <Wrap data-testid="tags">
              {Boolean(job.seniority.length) &&
                job.seniority.map((seniority) => (
                  <WrapItem key={seniority}>
                    <Badge colorScheme="primary" fontSize={{base: 12, md: 11}}>
                      {seniority}
                    </Badge>
                  </WrapItem>
                ))}
              {job.tags.map((tag) => (
                <WrapItem key={tag}>
                  <Badge colorScheme="secondary" fontSize={{base: 12, md: 11}}>
                    {tag}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          )}
          {job.description && (
            <Text aria-label={job.title} fontSize="md" role="article" textStyle="soft">
              {job.description}
            </Text>
          )}
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            marginTop="auto"
          >
            {job.rate && (
              <Text data-testid="range" fontSize="sm" fontWeight="500" textStyle="success">
                {job.rate}
              </Text>
            )}
            <Stack alignItems="center" direction="row" marginLeft="auto" spacing={4}>
              <Button
                aria-label="Compartir"
                colorScheme="secondary"
                paddingY={2}
                size="sm"
                variant="link"
                onClick={handleShare}
              >
                Compartir
              </Button>
              {questions.length ? (
                <Button
                  aria-label="Aplicar"
                  colorScheme="primary"
                  size="sm"
                  tabIndex={-1}
                  variant={job.featured ? "solid" : "ghost"}
                  onClick={() => toggleModal(true)}
                >
                  Aplicar
                </Button>
              ) : (
                <Link
                  isExternal
                  href={job.link}
                  rel="noopener noreferrer nofollow"
                  onClick={handleApply}
                >
                  <Button
                    aria-label="Aplicar"
                    colorScheme="primary"
                    size="sm"
                    tabIndex={-1}
                    variant={job.featured ? "solid" : "ghost"}
                  >
                    Aplicar
                  </Button>
                </Link>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      {Boolean(questions.length) && (
        <Modal
          blockScrollOnMount
          preserveScrollBarGap
          isOpen={isModalShown}
          onClose={() => toggleModal(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Aplicar a {job.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={6}>
                {questions.map((question) => {
                  return (
                    <FormControl key={question}>
                      <FormLabel htmlFor={question}>{question}</FormLabel>
                      <Input
                        id={question}
                        type="text"
                        value={formData[question]}
                        onChange={(event) =>
                          setFormData((formData) => ({...formData, [question]: event.target.value}))
                        }
                      />
                    </FormControl>
                  );
                })}
              </Stack>
            </ModalBody>

            <ModalFooter alignItems="center" display="flex" justifyContent="space-between">
              <Button variant="ghost" onClick={() => toggleModal(false)}>
                Cerrar
              </Button>
              <Link isExternal href={link} rel="noopener noreferrer nofollow" onClick={handleApply}>
                <Button aria-label="Aplicar" colorScheme="primary">
                  Aplicar
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default JobCard;
