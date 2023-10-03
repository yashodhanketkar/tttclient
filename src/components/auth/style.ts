import { SxProps } from "@mui/material";

export const FormContainer: SxProps = {
	display: "flex",
	flexDirection: "column",
	maxWidth: "50%",
	marginX: "auto",
	alignItems: "center",
	gap: 1,
};

export const FormElements: SxProps = {
	width: "75%",
};

export const FormButton: SxProps = {
	...FormElements,
	paddingY: 2,
	borderRadius: 2,
}

export const InputPropsStyle = {
	sx: {
		borderRadius: 2,
	}
}
