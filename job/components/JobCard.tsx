import React from "react";
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
} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

import * as analytics from "../../analytics";
import {Job} from "../types";
import FixedImage from "../../ui/display/FixedImage";
interface Props {
  job: Job;
}

function JobCard({job}: Props): JSX.Element {
  const toast = useToast();
  const {onCopy} = useClipboard(`${process.env.NEXT_PUBLIC_URL}/${job.id}`);

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
          <Text fontSize="md" name={job.title} role="article" textStyle="soft">
            {job.description}
          </Text>
        )}
        <Stack alignItems="center" direction="row" justifyContent="space-between" marginTop="auto">
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
            <Link
              isExternal
              href={job.link}
              rel="noopener noreferrer nofollow"
              onClick={() =>
                analytics.track("click", {
                  value: "apply",
                  company: job.company,
                  position: job.title,
                  title: `${job.company} - ${job.title}`,
                  featured: job.featured,
                  tags: job.tags,
                  seniority: job.seniority,
                  id: job.id,
                })
              }
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
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default JobCard;
