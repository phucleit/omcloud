import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  titleBold: {
    fontWeight: 600,
  },
  iconsBar: {
    marginBottom: theme.spacing(4),
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.text.hint + "80",
  },
  tab: {
    color: theme.palette.primary.light + "CC",
  },
  materailIcon: {
    display: "flex",
    paddingLeft: `${theme.spacing(4)}px !important`,
    paddingRight: `${theme.spacing(4)}px !important`,
    color: theme.palette.text.secondary,
    fontSize: 24,
    overflowX: "hidden",
  },
  materialIconText: {
    marginLeft: theme.spacing(2),
    fontSize: 14,
  },
  iconsContainer: {
    boxShadow: theme.customShadows.widget,
    overflow: "hidden",
    paddingBottom: theme.spacing(2),
  },
  serviceData: {
    background: '#fff',
  },
  serviceListEdit: {
    border: 'none',
    borderRadius: '10px',
    padding: '5px 10px',
    backgroundColor: '#3bb077',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  serviceListDelete: {
    color: '#f00',
    cursor: 'pointer',
  },
  buttonAction: {
    display: 'flex',
    alignItems: 'center',
  }
}));
