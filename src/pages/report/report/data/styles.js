import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
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
  },
  search: {
    marginBottom: '30px',
  },
  searchTerm: {
    width: '97%',
    height: '40px',
  },
  searchButton: {
    width: '3%',
    height: '40px',
  }
}));
