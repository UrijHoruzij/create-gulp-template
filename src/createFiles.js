import fs from 'fs';
import chalk from 'chalk';
import { promisify } from 'util';
const writeFile = promisify(fs.writeFile);

const createFiles = async () => {
	try {
		const editorTemplate = `root = true
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
block_comment_start = /**
block_comment = *
block_comment_end = */

[*.md]
indent_size = 4`;
		const prettierTemplate = `{
    "printWidth": 120,
    "useTabs": true,
    "semi":true,
    "tabWidth": 2,
    "singleQuote": true,
    "jsxSingleQuote":false,
    "trailingComma": "all",
    "bracketSpacing": true,
    "bracketSameLine": true,
    "arrowParens": "always"
}`;
		const browserslistTemplate = `last 2 versions`;
		writeFile(`${process.cwd()}/.editorconfig`, editorTemplate, 'utf8');
		writeFile(`${process.cwd()}/.prettierrc`, prettierTemplate, 'utf8');
		writeFile(`${process.cwd()}/.browserslistrc`, browserslistTemplate, 'utf8');
	} catch (err) {
		console.log(chalk.red.bold('ERROR'));
		console.log(chalk.red(err));
	}
};
export default createFiles;
