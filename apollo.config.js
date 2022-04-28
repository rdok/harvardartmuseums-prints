module.exports = (async function () {
  return {
    client: {
      includes: ["./src/graphql/**/*.ts"],
      service: {
        name: "harvardartmuseums-graphql",
        url: "http://127.0.0.1:3070/graphql",
      },
    },
  };
})();
