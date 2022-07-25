import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  constructionData: {
    background: '#fff',
  },
  constructionListEdit: {
    border: 'none',
    borderRadius: '10px',
    padding: '5px 10px',
    backgroundColor: '#3bb077',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  constructionListDelete: {
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
    height: '38px',
    marginLeft: '20px',
    marginRight: '20px',
    borderRadius: '5px'
  },
  searchButton: {
    width: '3%',
    height: '38px',
  },
  newConstructionType: {
    height: '38px',
    marginLeft: '20px',
    borderRadius: '5px'
  },
  boxSearch: {
    marginBottom: '20px',
  },
  newStatusType: {
    height: '38px',
    borderRadius: '5px'
  }
}));
