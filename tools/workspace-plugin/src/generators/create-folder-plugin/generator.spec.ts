import { Tree } from "@nx/devkit";
import * as path from "path";

import { CreateFolderPluginGenerator } from "./generator";

jest.mock("@nx/devkit", () => ({
  generateFiles: jest.fn(),
  formatFiles: jest.fn(),
  names: jest.fn().mockReturnValue({
    fileName: "my-plugin",
    className: "MyPlugin",
  }),
}));

describe("CreateFolderPluginGenerator", () => {
  let tree: Tree;

  beforeEach(() => {
    // Создаем мок для дерева файлов
    tree = {
      read: jest.fn(),
      write: jest.fn(),
      delete: jest.fn(),
      // Добавьте другие методы по мере необходимости
    } as unknown as Tree;
  });

  it("should generate files with correct options", async () => {
    const schema = { name: "my-plugin" };

    await CreateFolderPluginGenerator(tree, schema);

    expect(generateFiles).toHaveBeenCalledWith(tree, path.join(__dirname, "files"), "libs/my-plugin", {
      ...schema,
      name: "my-plugin",
    });
  });

  it("should create the expected files", async () => {
    const schema = { name: "my-plugin" };

    await CreateFolderPluginGenerator(tree, schema);

    // Проверка, что write была вызвана с правильными аргументами
    expect(tree.write).toHaveBeenCalled(); // Проверяем, что функция write была вызвана

    // Вы можете дополнительно проверить конкретные пути или содержимое файлов
    const expectedFiles = [
      "libs/my-plugin/file1.ts",
      "libs/my-plugin/file2.ts",
      // Добавьте сюда ожидаемые файлы
    ];

    expectedFiles.forEach((file) => {
      expect(tree.write).toHaveBeenCalledWith(file, expect.any(String)); // Проверяем, что файл был создан
    });
  });

  it("should call formatFiles after generating files", async () => {
    const schema = { name: "my-plugin" };

    await CreateFolderPluginGenerator(tree, schema);

    expect(formatFiles).toHaveBeenCalledWith(tree);
  });
});
