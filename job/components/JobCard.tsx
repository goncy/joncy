import type {Job} from "../types";

import {useEffect, useMemo, useState} from "react";
import {
  Stack,
  Text,
  Badge,
  Button,
  Box,
  Wrap,
  WrapItem,
  useToast,
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
  ModalProps,
} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import NextLink from "next/link";

import * as analytics from "../../analytics";
import FixedImage from "../../ui/display/FixedImage";
import {compileLink, getLinkTokens, getTokensValues, setTokensValues} from "../utils/link";
import Link from "../../ui/controls/Link";

type Props = {
  job: Job;
};

type JobQuestionModalProps = Omit<ModalProps, "children"> & {
  questions: string[];
  onSubmit: VoidFunction;
  job: Job;
};

function JobQuestionsModal({
  questions,
  job,
  onSubmit,
  ...props
}: JobQuestionModalProps): JSX.Element {
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    typeof window === "undefined" ? {} : getTokensValues(questions),
  );
  const link = useMemo(
    () => (questions.length ? compileLink(job.link, formData) : job.link),
    [job.link, formData, questions.length],
  );

  useEffect(() => {
    setTokensValues(formData);
  }, [formData]);

  return (
    <Modal {...props}>
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
          <Button variant="ghost" onClick={props.onClose}>
            Cerrar
          </Button>
          <Link isExternal href={link} onClick={onSubmit}>
            <Button aria-label="Aplicar" colorScheme="primary">
              Aplicar
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function JobCard({job}: Props): JSX.Element {
  const toast = useToast();
  const {onCopy} = useClipboard(`${process.env.NEXT_PUBLIC_URL}/${job.id}`);
  const [isModalShown, toggleModal] = useState<boolean>(false);
  const questions = useMemo(() => getLinkTokens(job.link), [job.link]);

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
                <NextLink passHref href={`/${job.id}`}>
                  <LinkOverlay
                    aria-label={job.title}
                    fontSize={{base: "xl", md: "lg"}}
                    fontWeight="500"
                    lineHeight="normal"
                  >
                    {job.title}
                  </LinkOverlay>
                </NextLink>
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
                <Link isExternal href={job.link} onClick={handleApply}>
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
      {Boolean(questions.length) && isModalShown && (
        <JobQuestionsModal
          blockScrollOnMount
          isOpen
          preserveScrollBarGap
          job={job}
          questions={questions}
          onClose={() => toggleModal(false)}
          onSubmit={handleApply}
        />
      )}
    </>
  );
}

export default JobCard;
