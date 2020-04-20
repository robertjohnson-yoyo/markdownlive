import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import getConfig from "next/config";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { Box, Typography } from "@material-ui/core";

import { UsernameSetter, InteractionsContainer, Previewer } from "@/containers";
import { getRandomTextMd } from "@/helpers";

const { publicRuntimeConfig } = getConfig();
const { APP_URL } = publicRuntimeConfig;
const socket = io(APP_URL);
const defaultContent = getRandomTextMd();

const RoomHandler = ({ roomId }) => {
	const { name: username, role } = useSelector(state => state.user);
	const [shouldSaveNow, setShouldSaveNow] = useState(!username);
	const [content, setContent] = useState(null);

	useEffect(() => {
		if (!shouldSaveNow && username) {
			// @todo: fix: client can modify role in devtools
			socket.emit("room-join", { roomId, username, role, content });
		}
		// eslint-disable-next-line
	}, [username, shouldSaveNow]);

	useEffect(() => {
		setContent(defaultContent);
		socket.on("new-md-change", ({ content }) => {
			setContent(content);
		});
	}, []);

	const handleEdit = content => {
		socket.emit("md-change", { content });
	};

	return (
		<>
			<UsernameSetter
				shouldSaveNow={shouldSaveNow}
				onSetUsername={() => setShouldSaveNow(false)}
				textCommit="Join room"
			/>
			{username && (
				<>
					<InteractionsContainer socket={socket} />
					<Box textAlign="center">
						<Typography variant="h6">
							Room code:{" "}
							<Box
								fontWeight="fontWeightSemibold"
								component="span"
								color="text.primary"
							>
								{roomId}
							</Box>
						</Typography>
						<Previewer role={role} content={content} onEdit={handleEdit} />
					</Box>
				</>
			)}
		</>
	);
};

RoomHandler.propTypes = {
	roomId: PropTypes.string.isRequired,
};

export default RoomHandler;
