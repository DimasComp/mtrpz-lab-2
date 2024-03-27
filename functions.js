const replacements = [
    { from: /```(.*?)```/gs, html: '<pre>$1</pre>', stdout: '\x1b[7m$1\x1b[0m' }, // preformatted
    { from: /(?:^|\n)(.*?)\n/g, html: '<p>$1</p>' }, // paragraph
    { 
        from: /(?<![\dA-Za-zА-Яа-яҐґЄєІіЇї])\*\*([\dA-Za-zА-Яа-яҐґЄєІіЇї])(.*?)([\dA-Za-zА-Яа-яҐґЄєІіЇї])\*\*(?![\dA-Za-zА-Яа-яҐґЄєІіЇї])/,
        html: '<b>$1$2$3</b>', // bold
        stdout: '\x1b[1m$1$2$3\x1b[0m',
    },
    { 
        from: /(?<![\dA-Za-zА-Яа-яҐґЄєІіЇї])_([\dA-Za-zА-Яа-яҐґЄєІіЇї])(.*?)([\dA-Za-zА-Яа-яҐґЄєІіЇї])_(?![\dA-Za-zА-Яа-яҐґЄєІіЇї])/,
        html: '<i>$1$2$3</i>', // italic
        stdout: '\x1b[3m$1$2$3\x1b[0m',
    },
    { 
        from: /(?<![\dA-Za-zА-Яа-яҐґЄєІіЇї])`([\dA-Za-zА-Яа-яҐґЄєІіЇї])(.*?)([\dA-Za-zА-Яа-яҐґЄєІіЇї])`(?![\dA-Za-zА-Яа-яҐґЄєІіЇї])/,
        html: '<tt>$1$2$3</tt>', // monospaced
        stdout: '\x1b[7m$1$2$3\x1b[0m',
    },
];

const forbidden = [
    /(?<![\dA-Za-zА-Яа-яҐґЄєІіЇї])_([\dA-Za-zА-Яа-яҐґЄєІіЇї])/,
    /(?<![\dA-Za-zА-Яа-яҐґЄєІіЇї])`([\dA-Za-zА-Яа-яҐґЄєІіЇї])/,
    /([\dA-Za-zА-Яа-яҐґЄєІіЇї])\*\*([\dA-Za-zА-Яа-яҐґЄєІіЇї])/,
    /([\dA-Za-zА-Яа-яҐґЄєІіЇї])_(?![\dA-Za-zА-Яа-яҐґЄєІіЇї])/,
    /([\dA-Za-zА-Яа-яҐґЄєІіЇї])`(?![\dA-Za-zА-Яа-яҐґЄєІіЇї])/,
    /([\dA-Za-zА-Яа-яҐґЄєІіЇї])\*\*(?![\dA-Za-zА-Яа-яҐґЄєІіЇї])/,
];

const formats = [
    'html',
    'stdout',
];

export const convertMarkdown = (text, format) => {
    if (!formats.includes(format)) {
        throw new Error('Unknown format');
    }

    

    const {replaced, preformattedBlocks } = replacePreformatedWithToken(text);
    let html = replaced;

    replacements.slice(2).forEach(replacement => {
        html = html.replace(replacement.from, replacement[format]);
    });

    const hasNestedTags = checkForNestedTags(html);

    if (hasNestedTags) {
        throw new Error('Nested tags are not allowed');
    }

    const forbiddenTags = checkForbidden(html);

    if (forbiddenTags) {
        throw new Error('Unopened/unclosed tags');
    }

    if (format === 'html') html = html.replace(replacements[1].from, replacements[1].html);

    html = replaceTokenWithPreformatted(html, preformattedBlocks, format);

    return html;
};

const replacePreformatedWithToken = (text) => {
    const preformattedBlocks = [];
    const token = '%%PRE%%';

    const replaced = text.replace(replacements[0].from, (match, group) => {
        preformattedBlocks.push(group);
        return token;
    });

    return {
        replaced,
        preformattedBlocks,
    }
}

const replaceTokenWithPreformatted = (text, preformattedBlocks, format) => {
    return text.replace(/%%PRE%%/g, () => {
        return replacements[0][format].replace('$1', preformattedBlocks.shift());
    });
}

const checkForNestedTags = (text) => {
    const tegRegexp = /<(\w+)>(.*?)<\/\1>/g;

    const matches = text.matchAll(tegRegexp);
    for (const match of matches) {
        const [fullMatch, tag, content] = match;
        if (content.match(tegRegexp) || content.match(/%%PRE%%/)) {
            return true;
        }
    }
}

const checkForbidden = (text) => {
    for (const forbiddenTag of forbidden) {
        if (text.match(forbiddenTag)) {
            console.log(text.match(forbiddenTag));
            return true;
        }
    }
}