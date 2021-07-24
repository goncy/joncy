import * as analytics from "../utils";

describe("analytics utils", () => {
  describe("initialize", () => {
    beforeEach(() => {
      window.dataLayer = [];
      window.gtag = null;
      process.env.NEXT_PUBLIC_ENV = "test";
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should initialize correctly if env is set to production and dataLayer is undefined", () => {
      process.env.NEXT_PUBLIC_ENV = "production";
      window.dataLayer = null;

      analytics.initialize();

      expect(window.dataLayer[0][0]).toEqual("js");
      expect(window.dataLayer[1][0]).toEqual("config");
    });

    it("should initialize correctly if env is set to production", () => {
      process.env.NEXT_PUBLIC_ENV = "production";

      analytics.initialize();

      expect(window.dataLayer[0][0]).toEqual("js");
      expect(window.dataLayer[1][0]).toEqual("config");
    });

    it("should not initialize if env is set to other than production", () => {
      const event = "event";
      const name = "test";
      const parameters = {};
      const log = jest.spyOn(console, "log");

      process.env.NEXT_PUBLIC_ENV = "test";

      analytics.initialize();

      window.gtag(event, name, parameters);

      expect(window.dataLayer).toEqual([]);
      expect(log).toHaveBeenCalledTimes(2);
    });
  });

  describe("track", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      window.gtag = null;
    });

    it("should track events", () => {
      const name = "something";
      const parameters = {foo: "bar"};

      window.gtag = jest.fn();

      analytics.track(name, parameters);

      expect(window.gtag).toHaveBeenCalledWith("event", name, parameters);
    });

    it("should warn if any error is present", () => {
      const name = "something";
      const parameters = {foo: "bar"};
      const log = jest.spyOn(console, "warn");

      analytics.track(name, parameters);

      expect(log).toHaveBeenCalled();
    });
  });
});
