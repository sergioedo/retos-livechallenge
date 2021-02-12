const convertJsonToHtml = (tree) => {
	const newLine = '\n'
	const indent = '\t'
	const baseTag = tree.tag
	const childrenTag = 'li'
	let html = `<${baseTag}>${newLine}`
	tree.children.map(e => {
		html += `${indent}<${childrenTag}>${e.text}</${childrenTag}>${newLine}`
	})
	html += `</${baseTag}>`
	return html
}

module.exports = convertJsonToHtml;
