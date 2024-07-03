import { readFileSync } from 'fs';
import { join } from 'path';
import * as yalm from 'js-yaml';

const YAML_CONFIG_FILENAME = 'config.yml';

export default () => {
  console.log(yalm.load(join(__dirname, YAML_CONFIG_FILENAME)));
  return yalm.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
