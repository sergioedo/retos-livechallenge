const tabWithSpaces = (numSpaces) => {
    let i = 0
    let tab = ''
    for (i = 0; i < numSpaces; i++) tab += ' '
    return tab
}

const convertJsonToHtml = (tree, indentSpaces = 4) => {
    const newLine = '\n'
    const indent = tabWithSpaces(indentSpaces)
    const baseTag = tree.tag
    const childrenTag = 'li'
    let html = `<${baseTag}>${newLine}`
    tree.children.map(e => {
        html += `${indent}<${childrenTag}>${e.text}</${childrenTag}>${newLine}`
    })
    html += `</${baseTag}>`
    return html
}

module.exports = {
    convertJsonToHtml,
    tabWithSpaces
}
