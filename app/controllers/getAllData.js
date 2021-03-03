function getAllData (req, res) {
	const table = new Crud('table');
	// console.log("hi")
	let data = "hello"//table.find(req, res) => res.jsonp(req.result)
	return data
}

export { getAllData };