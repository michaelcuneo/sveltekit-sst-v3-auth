export const auth = new sst.aws.Auth("MyAuth", {
  issuer: "auth/index.handler",
});
