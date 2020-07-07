import prod from "./app-config-prod";
import dev from "./app-config-dev";
import local from "./app-config-local";

const appStage = process.env.REACT_APP_STAGE.trim();

const isDev =
  appStage !== undefined && appStage !== null && appStage.trim() === "development";

const isProduction =
  appStage !== undefined && appStage !== null && appStage.trim() === "production";

const isTest =
  appStage !== undefined && appStage !== null && appStage.trim() === "test";


let config = local;

if (isDev) {
  config = dev;

} else if (isTest || isProduction) {
  config = prod;
}

export default {
  // Add common config values here
  appStage,
  ...config,
};
