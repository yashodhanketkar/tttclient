import { SxProps } from "@mui/material";

export const FormContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  width: {
    xs: "100%",
    md: "50%",
  },
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
  fontWeight: 600,
};

export const InputPropsStyle = {
  sx: {
    borderRadius: 2,
    backgroundColor: "white",
  },
};

export const AuthHeading: SxProps = {
  fontWeight: 600,
  textAlign: "center",
  color: "text.main",
};
