const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

fs.readFile('input.html', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const dom = new JSDOM(data);
    const document = dom.window.document;
    const root = document.querySelector('dl');

    let markdown = processElement(root, 0);

    fs.writeFile('output.md', markdown, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Markdown file has been created');
    });
});

function processElement(element, level) {
    let markdown = '';
    const indentation = '  '.repeat(level);

    if (element.tagName.toLowerCase() === 'h3') {
        markdown += `${indentation}- ${element.textContent}\n`;
    } else if (element.tagName.toLowerCase() === 'a') {
        markdown += `${indentation}- [${element.textContent}](${element.href})\n`;
    }

    const children = Array.from(element.children);
    children.forEach(child => {
        markdown += processElement(child, level + 1);
    });

    return markdown;
}
