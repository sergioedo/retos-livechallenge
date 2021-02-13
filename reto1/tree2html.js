const tabWithSpaces = (numSpaces) => {
    let i = 0
    let tab = ''
    for (i = 0; i < numSpaces; i++) tab += ' '
    return tab
}

const convertJsonToHtml = (tree, indentSpaces = 4, level = 0) => {
    const newLine = '\n'
    const indentBase = tabWithSpaces(indentSpaces * level)
    const indent = tabWithSpaces(indentSpaces)
    // console.log(`${level} - ${indentSpaces} - [${indentBase}]`)
    const baseTag = tree.tag
    const childrenTag = 'li'
    let html = `${indentBase}<${baseTag}>${newLine}`
    tree.children.map(e => {
        if (e.children) { // caso recursivo
            e.children.map(child => {
                html += `${indentBase}${indent}<${childrenTag}>${newLine}`
                html += `${indentBase}${indent}${indent}${e.text}${newLine}`
                html += `${indentBase}${convertJsonToHtml(child, indentSpaces, level + 2)}${newLine}`
                html += `${indentBase}${indent}</${childrenTag}>${newLine}`
            })
        } else { // caso simple
            html += `${indentBase}${indent}<${childrenTag}>${e.text}</${childrenTag}>${newLine}`
        }
    })
    html += `${indentBase}</${baseTag}>`
    // console.log(html)
    return html
}

module.exports = {
    convertJsonToHtml,
    tabWithSpaces
}
