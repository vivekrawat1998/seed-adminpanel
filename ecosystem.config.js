module.exports = {
  apps: [
    {
      name: "cms",
      script: "npm",
      args: "start",
      cwd: "/home/msu/cms",
      env: {
        NODE_ENV: "production",
        PORT: 1337
      }
    }
  ]
};
