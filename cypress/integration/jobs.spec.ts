import mock from "../../job/mocks/default.json";

describe("Jobs", () => {
  it("should show all jobs", () => {
    cy.visit("/index/default");

    cy.get('[data-testid$="job"]').should("have.length", mock.length);
  });
});
