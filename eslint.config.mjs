import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [".next/**", "node_modules/**", "prisma/migrations/**", "a5-ig336/**"]
  }
];

export default config;
