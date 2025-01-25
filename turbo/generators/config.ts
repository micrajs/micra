import type {PlopTypes} from '@turbo/gen';
import {getTemplateFiles} from './utilities/getTemplateFiles';
import {normalizeTemplateName} from './utilities/normalizeTemplateName';
import {root} from './utilities/root';
import {runActionType} from './utilities/runActionType';
import {templates} from './utilities/templates';
import {plopActions} from './utilities/plopActions';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setActionType('run', runActionType);

  /**
   *
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
      ),
  });
}
