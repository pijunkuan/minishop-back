const getters = {
	token:state => state.user.token,
	username: state => state.user.username,
	title: state => state.web.title
}

export default getters