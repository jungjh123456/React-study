// function Pepero(props) {
//   return (<div>나는 Pepero {props.token} {props.children}</div>)
// }

export default function withToken(Component) {
	const token = localStorage.getItem('token');
  function NewComponent(props) {
    return <Component {...props} token={token}/>;
  }
	NewComponent.displayName = `${Component.displayName} <= withToken` 
  return NewComponent;
}

// export default withToken(Pepero);

// function withRouter(Component) {
//   const NewComponent = () => {
//     return <Component history={history} location={location} match={match} />;
//   }
//   return NewComponent;

// }

// export default withRouter(LoginButton);