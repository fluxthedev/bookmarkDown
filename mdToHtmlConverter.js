const fs = require('fs');
const markdown = require('markdown').markdown;  // Assuming a markdown parsing library is available

// Function to convert Markdown text to HTML
function markdownToHtml(mdText) {
    // Convert Markdown to HTML using the markdown library
    let htmlContent = markdown.toHTML(mdText);

    // TODO: Add additional processing if the Markdown format has specific patterns
    // that need to be converted differently to match the original HTML structure

    return '<html><head><title>Bookmarks</title></head><body>' + htmlContent + '</body></html>';
}

// Read the Markdown file
fs.readFile('./final_reorganized_bookmarks.md', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    // Convert the Markdown to HTML
    const htmlContent = markdownToHtml(data);

    // Write the HTML content to a new file
    fs.writeFile('./converted_bookmarks.html', htmlContent, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Markdown converted to HTML successfully.');
    });
});
