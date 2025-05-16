import { Resource } from "sst";
import { Example } from "@sveltekit-sst-v3-auth/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
