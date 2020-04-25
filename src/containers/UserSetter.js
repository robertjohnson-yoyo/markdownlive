import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser } from "@/store/actions";
import { UsernameCollector } from "@/components/molecules";

const UserSetter = ({ open, role, onSubmitUsername, ...props }) => {
	const user = useSelector(state => state.users.current);
	const dispatch = useDispatch();

	useEffect(() => {
		if (open && user) onSubmitUsername();
		// eslint-disable-next-line
	}, [open]);

	const handleSaveUsername = ({ name }) => {
		dispatch(setCurrentUser("01", name, role));
		onSubmitUsername();
	};

	return (
		<UsernameCollector
			open={open && !user}
			onCommit={handleSaveUsername}
			{...props}
		/>
	);
};

UserSetter.propTypes = {
	open: PropTypes.bool,
	role: PropTypes.oneOf(["author", "editor", "viewer"]).isRequired,
	onSubmitUsername: PropTypes.func.isRequired,
};

UserSetter.defaultProps = {
	open: false,
	role: "viewer",
};

export default UserSetter;
