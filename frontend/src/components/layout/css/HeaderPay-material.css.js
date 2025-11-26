import { makeStyles, withStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: "10px 0",
        display: "flex",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    heading: {
        color: "rgba(0,183,255, 1)",
        flexGrow: 1,
    },
    /*
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  */
    image: {
        marginLeft: "15px",
        cursor: "pointer",
    },

    menuButton: {
        marginRight: 36,
    },

    menuButtonHidden: {
        display: "none",
    },
}));
