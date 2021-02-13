const tree2html = require('./tree2html')
const convertJsonToHtml = tree2html.convertJsonToHtml
const tabWithSpaces = tree2html.tabWithSpaces

test('tab with 2, 3 or 4 spaces', () => {
    expect(tabWithSpaces(2)).toBe('  ')
    expect(tabWithSpaces(3)).toBe('   ')
    expect(tabWithSpaces(4)).toBe('    ')
})

const testCases = [
    ['basic', 4,
        {
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
        },
        `<ul>
    <li>Primer elemento</li>
    <li>Cáspita, otro elemento</li>
    <li>El último</li>
</ul>`
    ],
    ['basic', 2,
        {
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
        },
        `<ul>
  <li>Primer elemento</li>
  <li>Cáspita, otro elemento</li>
  <li>El último</li>
</ul>`
    ],
    [
        'tree with subtree', 4,
        {
            tag: "ul",
            children: [
                {
                    text: "Primer elemento"
                },
                {
                    text: "Cáspita, otro elemento",
                    children: [
                        {
                            tag: "ul",
                            children: [
                                {
                                    text: 'Primer heredero del cáspita'
                                },
                                {
                                    text: 'Último heredero del cáspita'
                                }
                            ]
                        }
                    ]
                },
                {
                    text: "El último"
                }
            ]
        },
        `<ul>
    <li>Primer elemento</li>
    <li>
        Cáspita, otro elemento
        <ul>
            <li>Primer heredero del cáspita</li>
            <li>Último heredero del cáspita</li>
        </ul>
    </li>
    <li>El último</li>
</ul>`
    ]
]
test.each(testCases)(
    'convert tree %s to HTML with %i spaces indentation',
    (desc, spaces, tree, html) => {
        expect(convertJsonToHtml(tree, spaces)).toBe(html);
    }
)