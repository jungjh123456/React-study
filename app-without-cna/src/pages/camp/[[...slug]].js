import { useRouter, withRouter } from 'next/router';

const Camp = () => {
	const router = useRouter();
	return <div>Camp: {JSON.stringify(router.query)}</div>;
};

export default Camp;
