import React from "react";
import {Stack, Text, Image, Badge, Button, LinkOverlay, LinkBox, Flex, Box} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

import {Job} from "../types";

interface Props {
  job: Job;
}

function JobCard({job}: Props): JSX.Element {
  return (
    <LinkBox
      key={job.id}
      as={Box}
      backgroundColor={job.featured ? "primary.50" : "white"}
      data-testid={job.featured ? "featured-job" : "job"}
      padding={4}
    >
      <Stack direction="row" spacing={4} width="100%">
        {job.image && (
          <Image
            aria-label={`${job.company} logo`}
            backgroundColor="white"
            borderRadius="md"
            height={{base: 12, sm: 24}}
            loading="lazy"
            minWidth={{base: 12, sm: 24}}
            objectFit="contain"
            src={job.image}
            width={{base: 12, sm: 24}}
          />
        )}
        <Flex flexDirection="column" width="100%">
          <Stack
            direction={{base: "column-reverse", md: "row"}}
            justifyContent="space-between"
            spacing={{base: 1, md: 2}}
          >
            <Text color="gray.500" fontSize="sm">
              {job.company}
            </Text>
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              justifyContent={{base: "flex-start", md: "flex-end"}}
            >
              {job.tags.map((tag) => (
                <Badge key={tag} colorScheme="primary" fontSize={{base: 11, md: 12}}>
                  {tag}
                </Badge>
              ))}
            </Stack>
          </Stack>
          <Stack alignItems="center" direction="row" marginBottom={1} spacing={1}>
            {job.featured && (
              <StarIcon aria-label="star icon" color="yellow.500" height={4} role="img" width={4} />
            )}
            <Text fontSize="lg" fontWeight="500" lineHeight="normal">
              {job.position}
            </Text>
          </Stack>
          {job.description && (
            <Text
              color="gray.500"
              fontSize="sm"
              marginBottom={1}
              name={job.position}
              role="article"
            >
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
            <LinkOverlay href={job.link} marginLeft="auto">
              <Button colorScheme="primary" size="sm" variant="ghost">
                Aplicar
              </Button>
            </LinkOverlay>
          </Stack>
        </Flex>
      </Stack>
    </LinkBox>
  );
}

export default JobCard;
