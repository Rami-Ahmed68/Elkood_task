const { defineConfig } = require("@vue/cli-service");
const SitemapPlugin = require("sitemap-webpack-plugin").default;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new SitemapPlugin({
        base: "https://elkood-rami-task.vercel.app/",
        paths: [
          { path: "/", priority: 1 },
          { path: "/profile", priority: 0.9 },
          { path: "/user", priority: 0.8 },
          { path: "/install", priority: 0.7 },
          { path: "/appointment", priority: 0.6 },
          { path: "/register", priority: 0.5 },
          { path: "/login", priority: 0.4 },
          { path: "/dashboard", priority: 0.3 },
          { path: "/patients-waiting", priority: 0.3 },
          { path: "/current-patient", priority: 0.3 },
          { path: "/appointments", priority: 0.3 },
          { path: "/install", priority: 1 },
          { path: "/notfound", priority: 0.1 },
        ],
      }),
    ],
  },
});
