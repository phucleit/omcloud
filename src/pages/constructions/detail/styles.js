import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    newConstructionForm: {
        background: '#fff',
        marginTop: '40px',
        border: '1px solid rgba(224, 224, 224, 1)',
        borderRadius: '4px',
        padding: '15px',
    },
    newConstructionItem: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px',
        marginRight: '20px',
    },
    label: {
        marginBottom: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    inputName: {
        padding: '10px',
        border: '1px solid gray',
        borderRadius: '5px',
        fontSize: '15px',
    },
    newConstructionType: {
        height: '40px',
        borderRadius: '5px',
        fontSize: '15px',
    },
    newConstructionBtn: {
        marginTop: '20px',
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
    },
    constructionData: {
        background: '#fff',
    },
}));
