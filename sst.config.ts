/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sveltekit-sst-v3-auth",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const storage = await import("./infra/storage");
    import("./infra/api");
    const MyWebsite = await import("./infra/website");
    const auth = await import("./infra/auth");

    return {
      MyBucket: storage.bucket.name,
      MyWebsite: MyWebsite.website.url,
    };
  },
});
