import React from "react";
import {
  Stack,
  Text,
  Image,
  Badge,
  Button,
  LinkOverlay,
  LinkBox,
  Box,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

import * as analytics from "../../analytics";
import {Job} from "../types";

interface Props {
  job: Job;
}

function JobCard({job}: Props): JSX.Element {
  return (
    <LinkBox
      key={job.id}
      as={Box}
      data-testid={job.featured ? "featured-job" : "job"}
      layerStyle={job.featured ? "featured-card" : "card"}
      padding={4}
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
      <Stack spacing={{base: 3, md: 2}}>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          width="100%"
        >
          <Stack alignItems="flex-start" direction="row" spacing={2}>
            {job.image && (
              <Image
                aria-label={`${job.company} logo`}
                backgroundColor="white"
                borderRadius="md"
                height={12}
                loading="lazy"
                minWidth={12}
                objectFit="contain"
                src={`/api/image?url=${encodeURIComponent(job.image)}`}
                width={12}
              />
            )}
            <Stack spacing={0}>
              <Text fontSize={{base: "md", md: "sm"}} lineHeight="normal" textStyle="soft">
                {job.company}
              </Text>
              <Text
                as="span"
                fontSize={{base: "xl", md: "lg"}}
                fontWeight="500"
                lineHeight="normal"
              >
                {job.title}
              </Text>
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
        </Stack>
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
                <Badge colorScheme="green" fontSize={{base: 12, md: 11}}>
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
        <Stack
          alignItems="flex-end"
          direction="row"
          justifyContent="space-between"
          marginTop="auto"
        >
          {(job.min || job.max) && (
            <Text color="green.500" data-testid="range" fontSize="sm" fontWeight="500">
              {job.min}
              {job.min && job.max && ` - `}
              {job.max}
            </Text>
          )}
          <LinkOverlay href={job.link} marginLeft="auto" target="_blank">
            <Button
              aria-label="Aplicar"
              colorScheme="primary"
              size="sm"
              tabIndex={-1}
              variant={job.featured ? "solid" : "ghost"}
            >
              Aplicar
            </Button>
          </LinkOverlay>
        </Stack>
      </Stack>
    </LinkBox>
  );
}

export default JobCard;
