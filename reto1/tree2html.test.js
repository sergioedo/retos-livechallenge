const convertJsonToHtml = require('./tree2html')

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