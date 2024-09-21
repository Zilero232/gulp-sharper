import { type Tree, joinPathFragments, generateFiles, formatFiles, names } from "@nx/devkit";
import * as path from "path";

import GulpWinstonError from "@zilero/gulp-winston-error";

import type { PluginSchema } from "./schema";

import { PLUGIN_NAME } from "./constants";

export async function CreateFolderPluginGenerator(tree: Tree, schema: PluginSchema) {
  if (!schema.name) {
    return GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: `You must specify the name of the plugin.`,
    });
  }

  const pluginPath = joinPathFragments("libs", schema.name);

  if (tree.exists(pluginPath)) {
    return GulpWinstonError({
      pluginName: PLUGIN_NAME,
      message: `The folder with the plugin "${pluginPath}" it already exists.`,
    });
  }

  const templateOptions = {
    ...schema,
    name: names(schema.name).fileName, // This value will be replaced in the templates.
    PluginName: names(schema.name).className,
  };

  // File Generation.
  generateFiles(tree, path.join(__dirname, "files"), pluginPath, templateOptions);

  // Format the files.
  await formatFiles(tree);
}

export default CreateFolderPluginGenerator;
