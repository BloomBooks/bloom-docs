import { IDocuNotionConfig } from "@sillsdev/docu-notion";
import { bloomBookEmbedding } from "./src/plugins/BloomBookEmbedding";

const config: IDocuNotionConfig = {
  plugins: [bloomBookEmbedding],
};

export default config;
