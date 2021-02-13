const tabWithSpaces = (numSpaces) => {
    let i = 0
    let tab = ''
    for (i = 0; i < numSpaces; i++) tab += ' '
    return tab
}

const convertJsonToHtml = (tree, tabSpaces = 4, baseTabs = 0) => {
    const newLine = '\n'
    const baseIndent = tabWithSpaces(tabSpaces * baseTabs)
    const tabIndent = tabWithSpaces(tabSpaces)
    // console.log(`${level} - ${indentSpaces} - [${indentBase}]`)
    const baseTag = tree.tag
    const childrenTag = 'li'

    let html = `${baseIndent}<${baseTag}>${newLine}`
    tree.children.map(e => {
        if (e.children) { // caso recursivo
            html += `${baseIndent}${tabIndent}<${childrenTag}>${newLine}`
            html += `${baseIndent}${tabIndent}${tabIndent}${e.text}${newLine}`
            e.children.map(child => {
                html += `${convertJsonToHtml(child, tabSpaces, baseTabs + 2)}${newLine}`
            })
            html += `${baseIndent}${tabIndent}</${childrenTag}>${newLine}`
        } else { // caso simple
            html += `${baseIndent}${tabIndent}<${childrenTag}>${e.text}</${childrenTag}>${newLine}`
        }
    })
    html += `${baseIndent}</${baseTag}>`
    // console.log(html)
    return html
}

module.exports = {
    convertJsonToHtml,
    tabWithSpaces
}
