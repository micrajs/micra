import type {PlopTypes} from '@turbo/gen';
import * as shell from 'shelljs';
import {cwd} from './utilities/cwd';
import {getTemplateFiles} from './utilities/getTemplateFiles';
import {normalizeTemplateName} from './utilities/normalizeTemplateName';
import {plopActions} from './utilities/plopActions';
import {root} from './utilities/root';
import {runActionType} from './utilities/runActionType';
import {templates} from './utilities/templates';
import {formatAction} from './utilities/formatAction';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setActionType('run', runActionType);

  /**
   * Command to generate a new domain specification in Micra's core package.
   */
  plop.setGenerator('spec', {
    description: "Create a new domain specification in Micra's core package",
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new domain?',
      },
    ],
    actions: () =>
      plopActions(
        getTemplateFiles(templates('spec')).map(({file, templateFile}) => ({
          templateFile,
          type: 'add',
          path: root('packages', 'core', '{{name}}', normalizeTemplateName(file)),
        })),
        formatAction,
      ),
  });

  /**
   * Command to generate a new library in the packages directory.
   */
  plop.setGenerator('library', {
    description: 'Create a new library in the packages directory',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new library?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description of the new library?',
      },
    ],
    actions: () =>
      plopActions(
        getTemplateFiles(templates('library')).map(({file, templateFile}) => ({
          templateFile,
          type: 'add',
          path: root('packages', '{{name}}', normalizeTemplateName(file)),
        })),
        {
          type: 'modify',
          path: root('.performance.mjs'),
          transform(content: any, data: any = {}) {
            const importStatement = `import './packages/${data.name}/.performance.mjs';`;

            return content.includes(importStatement) ? content : `${importStatement}\n${content}`;
          },
        },
        {
          type: 'run',
          async call() {
            shell.exec('pnpm install');
            return 'Installed dependencies';
          },
        },
        formatAction,
      ),
  });

  /**
   * Command to generate a new submodule on a library.
   */
  plop.setGenerator('submodule', {
    description: 'Create a new submodule file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new submodule?',
      },
    ],
    actions: () =>
      plopActions(
        getTemplateFiles(templates('submodule')).map(({file, templateFile}) => ({
          templateFile,
          type: 'add',
          path: cwd('src', normalizeTemplateName(file)),
        })),
        {
          type: 'modify',
          path: cwd('package.json'),
          transform(content: string, data: Record<any, any> = {}) {
            const pkg = JSON.parse(content);
            pkg.exports[`./${data.name}`] = {
              types: `./dist/${data.name}.d.ts`,
              import: `./dist/${data.name}.js`,
              require: `./dist/${data.name}.cjs`,
            };

            return JSON.stringify(pkg, null, 2);
          },
        },
        {
          type: 'modify',
          path: cwd('vite.config.ts'),
          transform(content: any, data: any = {}) {
            return content.replace(
              `entry: {\n        index: 'src/index.ts',`,
              `entry: {\n        index: 'src/index.ts',\n        ${data.name}: 'src/${data.name}.ts',`,
            );
          },
        },
        {
          type: 'modify',
          path: cwd('.typedoc.mjs'),
          transform(content: any, data: any = {}) {
            const submoduleEntry = `'src/${data.name}.ts',`;
            if (content.includes('// Add submodules')) {
              return content.replace('// Add submodules', `// Add submodules\n\t${submoduleEntry}`);
            }

            return content.replace(
              'export default entryPoints: [',
              `export default entryPoints: [\n\t${submoduleEntry}`,
            );
          },
        },
        {
          type: 'modify',
          path: cwd('src', 'index.ts'),
          transform(content: any, data: any = {}) {
            return `${content}\nexport * from './${data.name}';\n`;
          },
        },
        {
          type: 'modify',
          path: cwd('.size-limit.mjs'),
          transform(content: any, data: any = {}) {
            const submoduleEntry = `{path: 'dist/${data.name}.js', limit: '13 b'},`;
            if (content.includes('// Add submodules')) {
              return content.replace('// Add submodules', `// Add submodules\n\t${submoduleEntry}`);
            }

            return content.replace(
              'export default sizeLimit(',
              `export default sizeLimit(\n\t${submoduleEntry}`,
            );
          },
        },
        formatAction,
      ),
  });

  /**
   * Command to generate a new guard.
   */
  plop.setGenerator('guard', {
    description: 'Create a new guard file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new guard?',
      },
    ],
    actions: () =>
      plopActions(
        getTemplateFiles(templates('guard')).map(({file, templateFile}) => ({
          templateFile,
          type: 'add',
          path: cwd('src', 'guards', normalizeTemplateName(file)),
        })),
        formatAction,
      ),
  });

  /**
   * Command to generate a new utility file.
   */
  plop.setGenerator('utility', {
    description: 'Create a new utility file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new utility?',
      },
    ],
    actions: () =>
      plopActions(
        getTemplateFiles(templates('utility')).map(({file, templateFile}) => ({
          templateFile,
          type: 'add',
          path: cwd('src', 'utilities', normalizeTemplateName(file)),
        })),
        formatAction,
      ),
  });

  /**
   * Command to generate a new class file.
   */
  plop.setGenerator('class', {
    description: 'Create a new class file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new class?',
      },
    ],
    actions: () =>
      plopActions(
        getTemplateFiles(templates('class')).map(({file, templateFile}) => ({
          templateFile,
          type: 'add',
          path: cwd('src', 'classes', normalizeTemplateName(file)),
        })),
        formatAction,
      ),
  });

  /**
   * Command to generate a new constants file.
   */
  plop.setGenerator('constants', {
    description: 'Create a new constant file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new constant group?',
      },
    ],
    actions: () =>
      plopActions(
        getTemplateFiles(templates('constant')).map(({file, templateFile}) => ({
          templateFile,
          type: 'add',
          path: cwd('src', 'constants', normalizeTemplateName(file)),
        })),
        formatAction,
      ),
  });

  /**
   * Command to generate a new types file.
   */
  plop.setGenerator('types', {
    description: 'Create a new types file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new type group?',
      },
    ],
    actions: () =>
      plopActions(
        getTemplateFiles(templates('types')).map(({file, templateFile}) => ({
          templateFile,
          type: 'add',
          path: cwd('src', 'types', normalizeTemplateName(file)),
        })),
        formatAction,
      ),
  });

  plop.setGenerator('register', {
    description: 'Create a new register file',
    prompts: [],
    actions: () =>
      plopActions(
        getTemplateFiles(templates('register')).map(({file, templateFile}) => ({
          templateFile,
          type: 'add',
          path: cwd(normalizeTemplateName(file)),
        })),
        {
          type: 'modify',
          path: cwd('package.json'),
          transform(content: string, _data: Record<any, any> = {}) {
            const pkg = JSON.parse(content);
            pkg.exports[`./register`] = `./register.d.ts`;
            pkg.files = pkg.files?.concat('register.d.ts') || ['register.d.ts'];

            return JSON.stringify(pkg, null, 2);
          },
        },
        formatAction,
      ),
  });
}
