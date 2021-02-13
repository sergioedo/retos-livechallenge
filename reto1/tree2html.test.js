const tree2html = require('./tree2html')
const convertJsonToHtml = tree2html.convertJsonToHtml
const tabWithSpaces = tree2html.tabWithSpaces

test('tab with 2, 3 or 4 spaces', () => {
    expect(tabWithSpaces(2)).toBe('  ')
    expect(tabWithSpaces(3)).toBe('   ')
    expect(tabWithSpaces(4)).toBe('    ')
})

const testCases = [
    ['basic', 4, 0,
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
    ['basic', 2, 0,
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
    ['basic with initial indentation', 2, 5,
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
        `          <ul>
            <li>Primer elemento</li>
            <li>Cáspita, otro elemento</li>
            <li>El último</li>
          </ul>`
    ],
    [
        'tree with subtree', 4, 0,
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
    ],
    [
        'with multiples subtrees', 4, 0,
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
                                    text: 'Último heredero del cáspita',
                                    children: [
                                        {
                                            tag: "ul",
                                            children: [
                                                {
                                                    text: 'Primer heredero del cáspita 2'
                                                },
                                                {
                                                    text: 'Último heredero del cáspita 2'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tag: "ul",
                            children: [
                                {
                                    text: 'Primer heredero del cáspita 3'
                                },
                                {
                                    text: 'Último heredero del cáspita 3'
                                }
                            ]
                        }
                    ]
                },
                {
                    text: "Cáspita, otro elemento 4",
                    children: [
                        {
                            tag: "ul",
                            children: [
                                {
                                    text: 'Primer heredero del cáspita 4'
                                },
                                {
                                    text: 'Último heredero del cáspita 4'
                                }
                            ]
                        }
                    ]
                },
            ]
        },
        `<ul>
    <li>Primer elemento</li>
    <li>
        Cáspita, otro elemento
        <ul>
            <li>Primer heredero del cáspita</li>
            <li>
                Último heredero del cáspita
                <ul>
                    <li>Primer heredero del cáspita 2</li>
                    <li>Último heredero del cáspita 2</li>
                </ul>
            </li>
        </ul>
        <ul>
            <li>Primer heredero del cáspita 3</li>
            <li>Último heredero del cáspita 3</li>
        </ul>
    </li>
    <li>
        Cáspita, otro elemento 4
        <ul>
            <li>Primer heredero del cáspita 4</li>
            <li>Último heredero del cáspita 4</li>
        </ul>
    </li>
</ul>`
    ]
]
test.each(testCases)(
    'convert tree %s to HTML with %i spaces tabs and %i initial tabs',
    (desc, spaces, baseTabs, tree, html) => {
        expect(convertJsonToHtml(tree, spaces, baseTabs)).toBe(html);
    }
)