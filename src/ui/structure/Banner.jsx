import { Box, Typography, IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";

import theme from "../theme";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import EjectIcon from "@mui/icons-material/Eject";

export default function Banner({ styleProps }) {
    const imgPath = "V_logo.png";
    const btns = [
        { icon: <InfoOutlinedIcon />, text: "About", fn: <ContentAbout /> },
        {
            icon: <HelpOutlineOutlinedIcon />,
            text: "Help",
            fn: <ContentHelp />,
        },
        {
            icon: <StorageOutlinedIcon />,
            text: "Database",
            fn: <ContentDatabase />,
        },
    ];

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(null);

    const handleOpen = (id) => {
        setContent(id + 1);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const modalS = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60%",
        height: "60%",
        bgcolor: "black",
        color: "white",
        border: "2px solid #999",
        padding: "50px",
        borderRadius: styleProps.btnS.borderRadius,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRadiusRight: 0,
        boxShadow: 24,
        // boxShadow: "10px 5px 5px red",

        p: 4,
        overflow: "auto",
    };

    return (
        <>
            <Box
                sx={{
                    ...styleProps.btnS,
                    // bgcolor: "black",
                    background: "linear-gradient(45deg, #000000, #222222)",
                }}
                className="holomorphic"
            ></Box>
            <Box
                sx={{
                    ...styleProps.btnS,
                    bgcolor: "transparent",
                    flexGrow: 1,
                }}
            ></Box>
            {btns.map((btn, i) => (
                <Box
                    key={i}
                    sx={{
                        ...styleProps.btnS,

                        marginTop: `${theme.btnM * 2}px`,
                        marginBottom: `${theme.btnM * 2}px`,
                        bgcolor: "rgba(0, 0, 0, 0.1)",
                        // ...styleProps.btnTextS,
                    }}
                    arial-label={btn.text}
                    className="holomorphic"
                >
                    <IconButton
                        sx={{ height: "100%", width: "100%" }}
                        onClick={(e, id = i) => handleOpen(id)}
                    >
                        {btn.icon}
                    </IconButton>
                </Box>
            ))}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={modalS}
                    className="inv"
                >
                    {content &&
                        btns.map((btn, i) => {
                            if (i === content - 1) {
                                return btn.fn;
                            }
                        })}
                </Box>
            </Modal>
        </>
    );
}

function ContentAbout() {
    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
            >
                Here goes the information on the About
            </Typography>
            <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
            >
                This modal shows the ABOUT SECTION
                <br />
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.Lorem Ipsum is simply dummy
                text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum.Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.Lorem Ipsum is simply dummy
                text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>
            <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.Lorem Ipsum is simply dummy
                text of the printing and typesettin
            </Typography>
        </Box>
    );
}

function ContentHelp() {
    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
            >
                Here goes the information on the Help
            </Typography>
            <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
            >
                This modal shows the HELP SECTION
                <br />
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus Pabut also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
                typesettin
                <br />
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus Pabut also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
                typesettin
                <br />
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus Pabut also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
                typesettin
            </Typography>
        </Box>
    );
}

function ContentDatabase() {
    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
            >
                Here goes the information on the Database
            </Typography>
            <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
            >
                This modal shows the DATABASE SECTION
                <br />
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
                <br />
                Lots of numbers
            </Typography>
        </Box>
    );
}
