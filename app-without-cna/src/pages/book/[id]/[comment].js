import { withRouter } from 'next/router';

const Book = ({ router }) => {
	return <div>Book: {JSON.stringify(router.query)}</div>;
};

export default withRouter(Book);
