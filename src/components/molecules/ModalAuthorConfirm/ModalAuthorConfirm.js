import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Dialog, Box, Grid, Typography } from "@material-ui/core";

import { Button } from "@/components/atoms";

const ModalAuthorConfirm = ({ open, onMainAction, onClose }) => {
	const { t } = useTranslation();

	return (
		<Dialog open={open} onClose={onClose} maxWidth="lg">
			<Box py={4} px={10} textAlign="center">
				<Box maxWidth={450} mb={3}>
					<Typography variant="h4" gutterBottom>
						<Box
							fontWeight="fontWeightSemibold"
							component="span"
							color="text.primary"
						>
							{t("modals.author.title")}
						</Box>
					</Typography>
					<Typography gutterBottom>
						<Box component="span" color="text.primary">
							{t("modals.author.desc")}
						</Box>
					</Typography>
				</Box>
				<Grid container justify="center" spacing={2}>
					<Grid item>
						<Button onClick={onMainAction}>{t("modals.author.confirm")}</Button>
					</Grid>
					<Grid item>
						<Button onClick={onClose} color="secondary">
							{t("modals.author.cancel")}
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Dialog>
	);
};

ModalAuthorConfirm.propTypes = {
	open: PropTypes.bool,
	onMainAction: PropTypes.func.isRequired,
	onClose: PropTypes.func,
};

ModalAuthorConfirm.defaultProps = {
	open: false,
	onClose: null,
};

export default ModalAuthorConfirm;
