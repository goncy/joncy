import mock from "../../job/api/mocks/list/default.json";
import {parseJobs} from "../../job/api/utils";
import {RawJob} from "../../job/api/types";

const parsedMock = parseJobs((mock as unknown) as RawJob[]);

describe("Jobs", () => {
  it("should show all jobs", () => {
    cy.visit("/index/default");

    cy.get('[data-testid$="job"]').should("have.length", parsedMock.length);
  });

  it("should show a toast when share button is clicked", () => {
    cy.visit("/index/default");

    cy.get('[aria-label="Compartir"]').first().click();

    cy.get('[role="alert"]').should("have.class", "chakra-alert");
  });

  it("should redirect to details route when clicked", () => {
    cy.visit("/index/default");

    cy.get(`[aria-label="${parsedMock[0].title}"]`).first().click();

    cy.url().should("contain", `/${parsedMock[0].id}`);
  });

  it("should contain all seniorities and tags inside job card", () => {
    cy.visit("/index/default");

    cy.get(`#${parsedMock[0].id} [data-testid="tags"]`).within(() => {
      [...parsedMock[0].tags, ...parsedMock[0].seniority].forEach((item) => {
        cy.contains(item);
      });
    });
  });

  it("should show the right amount of featured jobs", () => {
    const featuredJobs = parsedMock.filter((job) => job.featured);

    cy.visit("/index/default");

    cy.get('[data-testid="featured-job"]').should("have.length", featuredJobs.length);
  });
});
