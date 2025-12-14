import { auth } from './auth';

export const website = new sst.aws.SvelteKit("MyWebsite", {
  link: [auth],
  path: "packages/website",
});
