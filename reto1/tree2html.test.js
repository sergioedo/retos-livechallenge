const tree2html = require('./tree2html')
const convertJsonToHtml = tree2html.convertJsonToHtml
const tabWithSpaces = tree2html.tabWithSpaces

test('tab with 2, 3 or 4 spaces', () => {
    expect(tabWithSpaces(2)).toBe('  ')
    expect(tabWithSpaces(3)).toBe('   ')
    expect(tabWithSpaces(4)).toBe('    ')
})

// Basic sample
// Input:
const tree = {
    tag: "ul",
    children: [
        {
            text: "Primer elemento"
        },
        {
            text: "Cáspita, otro elemento"
        },
        {
            text: "El último"
        }
    ]
}
// Output:
const html = `<ul>
    <li>Primer elemento</li>
    <li>Cáspita, otro elemento</li>
    <li>El último</li>
</ul>`

test('convert basic tree to HTML', () => {
    expect(convertJsonToHtml(tree)).toBe(html);
})

//Output with 2 spaces tabs
const htmlIndent2spaces = `<ul>
  <li>Primer elemento</li>
  <li>Cáspita, otro elemento</li>
  <li>El último</li>
</ul>`

test('convert basic tree to HTML with 2 spaces indentation', () => {
    expect(convertJsonToHtml(tree, 2)).toBe(htmlIndent2spaces);
})