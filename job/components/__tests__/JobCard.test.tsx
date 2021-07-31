import * as React from "react";
import * as chakra from "@chakra-ui/react";
import {render, screen, within, fireEvent} from "@testing-library/react";

import * as analytics from "../../../analytics";
import JobCard from "../JobCard";
import {Job} from "../../types";

const base: Job = {
  id: "id",
  image: "image",
  company: "MajorKey",
  min: "ARS 100",
  max: "ARS 200",
  title: "title",
  description: "description",
  tags: ["js", "react"],
  seniority: ["jr", "ssr"],
  link: "#",
  createdAt: 1000,
  expiredAt: 1000,
  featured: false,
};

jest.mock("../../../analytics");

describe("JobCard", () => {
  describe("side effects", () => {
    it("should track submission on analytics", () => {
      const job = base;

      render(<JobCard job={job} />);

      const submit = screen.getByLabelText("Aplicar");

      fireEvent.click(submit);

      expect(analytics.track).toHaveBeenCalled();
    });

    it("should call track, toast and copy when share is clicked", () => {
      const job = base;
      const copy = jest.fn();
      const toast = jest.fn();

      jest.spyOn<any, any>(chakra, "useClipboard").mockReturnValue({onCopy: copy});
      jest.spyOn<any, any>(chakra, "useToast").mockReturnValue(toast);

      render(<JobCard job={job} />);

      const share = screen.getByLabelText("Compartir");

      fireEvent.click(share);

      expect(analytics.track).toHaveBeenCalled();
      expect(copy).toHaveBeenCalled();
      expect(toast).toHaveBeenCalled();
    });
  });

  describe("negations", () => {
    it("should not show image when not provided", () => {
      const job = {
        ...base,
        image: null,
      };

      render(<JobCard job={job} />);

      expect(screen.queryByLabelText(`${job.company} logo`)).not.toBeInTheDocument();
    });

    it("should not show description when not provided", () => {
      const job = {
        ...base,
        description: null,
      };

      render(<JobCard job={job} />);

      expect(screen.queryByRole("article", {name: job.title})).not.toBeInTheDocument();
    });

    it("should not show min sallary when not provided", () => {
      const job = {
        ...base,
        min: null,
      };

      render(<JobCard job={job} />);

      expect(screen.getByTestId("range")).not.toHaveTextContent(job.min);
    });

    it("should not show max sallary when not provided", () => {
      const job = {
        ...base,
        max: null,
      };

      render(<JobCard job={job} />);

      expect(screen.getByTestId("range")).not.toHaveTextContent(job.max);
    });

    it("should not show a star when not featured", () => {
      const job = base;

      render(<JobCard job={job} />);

      expect(screen.queryByLabelText("star icon")).not.toBeInTheDocument();
    });
  });

  describe("assertions", () => {
    it("should show a non featured background when is not featured", () => {
      const job = base;

      render(<JobCard job={job} />);

      expect(screen.queryByTestId("featured-job")).not.toBeInTheDocument();
    });

    it("should show image when provided", () => {
      const job = base;

      render(<JobCard job={job} />);

      expect(screen.getByLabelText(`${job.company} logo`)).toBeInTheDocument();
    });

    it("should show description when provided", () => {
      const job = base;

      render(<JobCard job={job} />);

      expect(screen.getByText(job.description)).toBeInTheDocument();
    });

    it("should show min sallary when provided", () => {
      const job = base;
      const minRegex = new RegExp(job.min, "i");

      render(<JobCard job={job} />);

      expect(screen.getByText(minRegex)).toBeInTheDocument();
    });

    it("should show max sallary when provided", () => {
      const job = base;
      const maxRegex = new RegExp(job.max, "i");

      render(<JobCard job={job} />);

      expect(screen.getByText(maxRegex)).toBeInTheDocument();
    });

    it("should show min and max sallary when provided", () => {
      const job = base;
      const rangeRegex = new RegExp(`${job.min} - ${job.max}`, "i");

      render(<JobCard job={job} />);

      expect(screen.getByText(rangeRegex)).toBeInTheDocument();
    });

    it("should show a star when featured", () => {
      const job = {
        ...base,
        featured: true,
      };

      render(<JobCard job={job} />);

      expect(screen.getByLabelText("star icon")).toBeInTheDocument();
    });

    it("should show a featured background when featured", () => {
      const job = {
        ...base,
        featured: true,
      };

      render(<JobCard job={job} />);

      expect(screen.getByTestId("featured-job")).toBeInTheDocument();
    });

    it("should show a list of seniority badges", () => {
      const job = {
        ...base,
        featured: true,
      };

      render(<JobCard job={job} />);

      const tags = screen.getByTestId("tags");

      job.seniority.forEach((seniority) => {
        expect(within(tags).getByText(seniority)).toBeInTheDocument();
      });
    });

    it("should show a list of tag badges", () => {
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
