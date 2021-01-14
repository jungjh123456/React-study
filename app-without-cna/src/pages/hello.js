const Hello = () => (
	<div>
		<style jsx>
			{`
				.scoped {
					color: red;
				}
			`}
		</style>
		<p className="scoped">안녕하세요 : scoped</p>
		<p className="scoped">안녕하세요 : scoped</p>
	</div>
);

export default Hello;
