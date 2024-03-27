import { readFileSync, writeFileSync } from 'fs';
import { Command } from 'commander';
import { convertMarkdown } from './functions.js';

const program = new Command();

program
    .command('convert <file>')
    .description('Convert a markdown file to HTML')
    .option('-f --format [format]', 'The output format', 'html')
    .option('-o, --out <file>', 'The output file')
    .action((file, options) => {
        const markdown = readFileSync(file, 'utf-8');
        console.log(options);
        const html = convertMarkdown(markdown, options.format);

        const writeFunc = options.out ? writeFileSync.bind(null, options.out) : console.log;

        writeFunc(html);
    });

program.parse(process.argv);