import * as React from "react";
import {render, screen, within} from "@testing-library/react";

import JobCard from "../JobCard";
import {Job} from "../../types";

const base: Job = {
  id: "id",
  image: "image",
  company: "MajorKey",
  min: "ARS 100",
  max: "ARS 200",
  position: "position",
  description: "description",
  tags: ["js", "react"],
  seniority: ["jr", "ssr"],
  link: "#",
  createdAt: 1000,
  expiredAt: 1000,
  featured: false,
};

describe("JobCard", () => {
  describe("negations", () => {
    test("it should not show image when not provided", () => {
      const job = {
        ...base,
        image: null,
      };

      render(<JobCard job={job} />);

      expect(screen.queryByLabelText(`${job.company} logo`)).not.toBeInTheDocument();
    });

    test("it should not show description when not provided", () => {
      const job = {
        ...base,
        description: null,
      };

      render(<JobCard job={job} />);

      expect(screen.queryByRole("article", {name: job.position})).not.toBeInTheDocument();
    });

    test("it should not show min sallary when not provided", () => {
      const job = {
        ...base,
        min: null,
      };

      render(<JobCard job={job} />);

      expect(screen.getByTestId("range")).not.toHaveTextContent(job.min);
    });

    test("it should not show max sallary when not provided", () => {
      const job = {
        ...base,
        max: null,
      };

      render(<JobCard job={job} />);

      expect(screen.getByTestId("range")).not.toHaveTextContent(job.max);
    });

    test("it should not show a star when not featured", () => {
      const job = base;

      render(<JobCard job={job} />);

      expect(screen.queryByLabelText("star icon")).not.toBeInTheDocument();
    });
  });

  describe("assertions", () => {
    test("it should show a non featured background when is not featured", () => {
      const job = base;

      render(<JobCard job={job} />);

      expect(screen.queryByTestId("featured-job")).not.toBeInTheDocument();
    });

    test("it should show image when provided", () => {
      const job = base;

      render(<JobCard job={job} />);

      expect(screen.getByLabelText(`${job.company} logo`)).toBeInTheDocument();
    });

    test("it should show description when provided", () => {
      const job = base;

      render(<JobCard job={job} />);

      expect(screen.getByText(job.description)).toBeInTheDocument();
    });

    test("it should show min sallary when provided", () => {
      const job = base;
      const minRegex = new RegExp(job.min, "i");

      render(<JobCard job={job} />);

      expect(screen.getByText(minRegex)).toBeInTheDocument();
    });

    test("it should show max sallary when provided", () => {
      const job = base;
      const maxRegex = new RegExp(job.max, "i");

      render(<JobCard job={job} />);

      expect(screen.getByText(maxRegex)).toBeInTheDocument();
    });

    test("it should show min and max sallary when provided", () => {
      const job = base;
      const rangeRegex = new RegExp(`${job.min} - ${job.max}`, "i");

      render(<JobCard job={job} />);

      expect(screen.getByText(rangeRegex)).toBeInTheDocument();
    });

    test("it should show a star when featured", () => {
      const job = {
        ...base,
        featured: true,
      };

      render(<JobCard job={job} />);

      expect(screen.getByLabelText("star icon")).toBeInTheDocument();
    });

    test("it should show a featured background when featured", () => {
      const job = {
        ...base,
        featured: true,
      };

      render(<JobCard job={job} />);

      expect(screen.getByTestId("featured-job")).toBeInTheDocument();
    });

    test("it should show a list of seniority badges", () => {
      const job = {
        ...base,
        featured: true,
      };

      render(<JobCard job={job} />);

      const seniorities = screen.getByTestId("seniorities");

      job.seniority.forEach((seniority) => {
        expect(within(seniorities).getByText(seniority)).toBeInTheDocument();
      });
    });

    test("it should show a list of tag badges", () => {
      const job = {
        ...base,
        featured: true,
      };

      render(<JobCard job={job} />);

      const tags = screen.getByTestId("tags");

      job.tags.forEach((tag) => {
        expect(within(tags).getByText(tag)).toBeInTheDocument();
      });
    });
  });
});
