export const mapBodyToQueries = body => {
	let queries = '?';
	body && Object.keys(body).map(query => body[query] && (queries += `${query}=${body[query]}&`));
	queries = queries.substring(0, queries.length - 1);
	return queries;
};
