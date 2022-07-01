import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';
import 'tui-image-editor/dist/tui-image-editor.css';
import $ from 'jquery';
import {
	useHistory,
} from "react-router-dom";
import axios from 'axios';
import './custom.css';

function TableSupplies({rowsData, deleteTableRows, handleChange}) {
	const { t } = useTranslation();
	var classes = useStyles();
    return(
        rowsData.map((data, index)=>{
			const {name, unit, quantity} = data;
            return(
                <tr key={index}>
                	<td>
                    	<input type="text" value={name} onChange={(evnt)=>(handleChange(index, evnt))} name="name" placeholder={t('enter-materials')} className={classes.inputName} />
                	</td>
                	<td><input type="text" value={unit} onChange={(evnt)=>(handleChange(index, evnt))} name="unit" placeholder={t('enter-unit')} className={classes.inputName} /> </td>
                	<td><input type="text" value={quantity}  onChange={(evnt)=>(handleChange(index, evnt))} name="quantity" placeholder={t('enter-amount')} className={classes.inputName} /> </td>
                	<td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            	</tr>
            );
        })
    )
}

function TableMaintenance({rowsData, deleteTableRows, handleChange}) {
	const { t } = useTranslation();
	var classes = useStyles();
    return(
        rowsData.map((data, index)=>{
            const {name, image, description} = data;
            return(
                <tr key={index}>
                <td>
                    <input type="text" value={name} onChange={(evnt)=>(handleChange(index, evnt))} name="name" placeholder={t('enter-maintenance-equipment')} className={classes.inputName} />
                </td>
				<td class={`editor-wrapper-${index}`}>
					<img
						style={{cursor: 'pointer'}} 
						className={`editor-image`}
						width={150} height={100}
						src={'./placeholder_add_image.png'}/>
                </td>
                <td><input type="text" value={description}  onChange={(evnt)=>(handleChange(index, evnt))} name="description" placeholder={t('enter-maintenance-description')} className={classes.inputName} /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>
            )
        })
    )
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

function createFormData(formData, key, arr) {
	for(let i = 0; i < arr.length; i++){
		for (var j in arr[i]) {
			let finalKey =  key + '[' + i + '][' + j + ']';
			let data = arr[i][j];
			if (finalKey === 'tasks[' + i + '][images]'){
				$(`.editor-wrapper-${i} .editor-image`).each(function(j, obj) {
					const tmp = finalKey + '[' + j + ']';
					if ($(this).attr("src") !== './placeholder_add_image.png')
						formData.append(tmp, dataURItoBlob($(this).attr("src")));
				});
			}
			else
				formData.append(finalKey, data);
        }
	}
}

export default function NewReport() {

	var classes = useStyles();
	let history = useHistory();
	const { t } = useTranslation();	

	const [construction, setConstruction] = useState([]);

	const [ name, setName ] = useState('');
	const [ code, setCode ] = useState('');
	const [ constructionId, setConstructionId ] = useState('');
	const [ publishDay,setPublishDay ] = useState('');
	const [ publishTime, setPublishTime ] = useState('');
	const [ representativeName, setRepresentativeName ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ frequency, setFrequency ] = useState('');
	const [ validDate, setValidDate ] = useState('');
	const [ hiconComment, setHiconComment ] = useState('');
	const [ customerComment, setCustomerComment ] = useState('');
	const [ rowSupplies, setRowSupplies ] = useState([]);
	const [ rowMaintenance, setRowMaintenance ] = useState([]);

	const [permission, setPermission] = useState(false)
	useEffect(() => {
		if (localStorage.abilities.includes("construction-report"))
			setPermission(true)
		else setPermission(false)
		loadConstruction();
	}, []);

	const loadConstruction = async () => {
		const result = await axios.get('https://backend.omcloud.vn/api/construction?status=3');
		setConstruction(result.data.data);
	};
	const Construction = construction.map(Construction => Construction);

	/* table row bảo trị */
    const addTableRowsMaintenance = () => {
        const rowsInputMaintenance = {
            name: '',
            images: '',
            description: ''  
        };
        setRowMaintenance([...rowMaintenance, rowsInputMaintenance]);
    };

    const deleteTableRowsMaintenance = (index) => {
        const rows = [...rowMaintenance];
        rows.splice(index, 1);
        setRowMaintenance(rows);
    }

	const handleChangeMaintenance = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...rowMaintenance];

        rowsInput[index][name] = value;
        setRowMaintenance(rowsInput);
    }
	/* end table row thiết bị */
 
	/* table row thiết bị */
    const addTableRowsSupplies = () => {
        const rowsInputSupplies = {
            name: '',
            unit: '',
            quantity: ''  
        };
        setRowSupplies([...rowSupplies, rowsInputSupplies]);
    };

    const deleteTableRowsSupplies = (index) => {
        const rows = [...rowSupplies];
        rows.splice(index, 1);
        setRowSupplies(rows);
    }

	const handleChangeSupplies = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...rowSupplies];
        rowsInput[index][name] = value;
        setRowSupplies(rowsInput);
    }
	/* end table row thiết bị */

	const handleFrequencyChange = (e) => {
		e.preventDefault();
		setFrequency(e.target.value);
	}

	const handleContructionsChange = (e) => {
		e.preventDefault();
		setConstructionId(e.target.value);
	}
	
	const handleAddReport = (e) => {
		e.preventDefault();

		const formDataReport = new FormData();
		formDataReport.append('name', name);
		formDataReport.append('code', code);
		formDataReport.append('publish_day', publishDay);
		formDataReport.append('publish_time', publishTime);
		formDataReport.append('representative_name', representativeName);
		formDataReport.append('address', address);
		formDataReport.append('construction_id', constructionId);
		formDataReport.append('frequency', frequency);
		formDataReport.append('valid_date', validDate);
		formDataReport.append('hicon_comment', hiconComment);
		formDataReport.append('customer_comment', customerComment);

		if (rowMaintenance.length > 0)
			createFormData(formDataReport, 'tasks', rowMaintenance);
		if (rowSupplies.length > 0)
			createFormData(formDataReport, 'items', rowSupplies);

		const config = {
			method: 'post',
			url: 'https://backend.omcloud.vn/api/report',
			headers: { 
				'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
				'Content-Type': 'application/json'
			},
			data : formDataReport
		};

		axios(config)
		.then(function (res) {
			if (res["data"]["success"]){
				console.log(res["data"]["data"]);
				alert('Tạo báo cáo thành công!');
          		history.push('/app/report');
			}
			else{
				alert('Thiếu thông tin các trường còn lại: ' + res["data"]["message"]);
				console.log(res["data"]["message"]);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	return (
		<>
			{
				permission ?
					<>
						{
							<>
								<PageTitle title={t('Report-Add')} />
								<div className={classes.newConstructionForm}>
									<div className="row">
										<div className="col medium-6 small-12 large-6">
											<div className={classes.newConstructionItem}>
												<label className={classes.label}>{t('title-name')}</label>
												<input type="text" name="name" className={classes.inputName} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('title-name-enter')} />
											</div>
										</div>
										<div className="col medium-6 small-12 large-6">
											<div className={classes.newConstructionItem}>
												<label className={classes.label}>{t('code-name')}</label>
												<input type="text" name="code" className={classes.inputName} value={code} onChange={(e) => setCode(e.target.value)} placeholder={t('code-name-enter')} />
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col medium-6 small-12 large-6">
											<div className={classes.newConstructionItem}>
                								<label className={classes.label}>{t('project')} (*)</label>
                								<select
          											onChange={e => handleContructionsChange(e)}
          											className={classes.newConstructionType}
          											id="newConstruction"
          										>
          											<option>--------</option>
          											{
            											Construction.map((name, key) => <option key={key.id} value={name.id}>{name.name}</option>)
          											}
        										</select>
              								</div>
										</div>
										<div className="col medium-6 small-12 large-6">
											<div className={classes.newConstructionItem}>
												<label className={classes.label}>{t('dateIssued')}</label>
												<input type="text" name="publishDay" className={classes.inputName} value={publishDay} onChange={(e) => setPublishDay(e.target.value)} placeholder={t('dateIssued-enter')} />
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col medium-4 small-12 large-4">
											<div className={classes.newConstructionItem}>
												<label className={classes.label}>{t('timeIssued')}</label>
												<input type="text" name="publishTime" className={classes.inputName} value={publishTime} onChange={(e) => setPublishTime(e.target.value)} placeholder={t('timeIssued-enter')} />
											</div>
										</div>
										<div className="col medium-4 small-12 large-4">
											<div className={classes.newConstructionItem}>
												<label className={classes.label}>{t('client-name')}</label>
												<input type="text" name="representativeName" className={classes.inputName} value={representativeName} onChange={(e) => setRepresentativeName(e.target.value)} placeholder={t('clientName-enter')} />
											</div>
										</div>
										<div className="col medium-4 small-12 large-4">
											<div className={classes.newConstructionItem}>
												<label className={classes.label}>{t('date-test')} (*)</label>
									  			<input type="text" name="validDate" className={classes.inputName} value={validDate} onChange={(e) => setValidDate(e.target.value)} placeholder={t('dateTest-enter')} />
								  			</div>
										</div>
									</div>
									<div className="row">
										<div className="col medium-6 small-12 large-6">
											<div className={classes.newConstructionItem}>
												<label className={classes.label}>{t('address')}</label>
												<input type="text" name="address" className={classes.inputName} value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t('address-enter')} />
											</div>
										</div>
										<div className="col medium-6 small-12 large-6">
											<div className={classes.newConstructionItem}>
                								<label className={classes.label}>{t('frequency')} (*)</label>
                								<select
													onChange={e => handleFrequencyChange(e)}
                  									className={classes.newConstructionType}
                  									id="newConstructionType"
                								>
													<option>--------</option>
                  									<option value="1">{t('monthly')}</option>
                  									<option value="2">{t('quarterly')}</option>
                  									<option value="3">{t('semi-yearly')}</option>
                  									<option value="4">{t('yearly')}</option>
                								</select>
              								</div>
										</div>
									</div>
									<div className="row">
										<div className="col medium-12 small-12 large-12">
											<div className={classes.newConstructionItem}>
									  			<label className={classes.label}>{t('maintenance')}</label>
									  			<table className="table">
										  			<thead>
											  			<tr>
												  			<th>{t('maintenance-equipment')}</th>
												  			<th>{t('maintenance-pictures')}</th>
												  			<th>{t('maintenance-description')}</th>
												  			<th><button className="btn btn-outline-success" onClick={addTableRowsMaintenance} >+</button></th>
											  			</tr>
										  			</thead>
										  			<tbody>
											  			<TableMaintenance rowsData={rowMaintenance} deleteTableRows={deleteTableRowsMaintenance} handleChange={handleChangeMaintenance} />
										  			</tbody> 
									  			</table>
								  			</div>
										</div>
									</div>
									<div className="row">
										<div className="col medium-12 small-12 large-12">
											<div className={classes.newConstructionItem}>
												<label className={classes.label}>{t('supplies')}</label>
												<table className="table">
                        							<thead>
                            							<tr>
                                							<th>{t('materials')}</th>
                                							<th>{t('unit')}</th>
                                							<th>{t('amount')}</th>
                                							<th><button className="btn btn-outline-success" onClick={addTableRowsSupplies} >+</button></th>
                            							</tr>
                        							</thead>
                        							<tbody>
                            							<TableSupplies rowsData={rowSupplies} deleteTableRows={deleteTableRowsSupplies} handleChange={handleChangeSupplies} />
                        							</tbody> 
                    							</table>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col medium-6 small-12 large-6">
											<div className={classes.newConstructionItem}>
												<label className={classes.label}>{t('hicon-reviews')} (*)</label>
												<textarea name="hiconComment" rows="4" cols="50" className={classes.inputName} value={hiconComment} onChange={(e) => setHiconComment(e.target.value)} placeholder={t('hiconReviews-enter')}></textarea>
											</div>
										</div>
										<div className="col medium-6 small-12 large-6">
											<div className={classes.newConstructionItem}>
												<label className={classes.label}>{t('customer-reviews')} (*)</label>
												<textarea name="customerComment" rows="4" cols="50" className={classes.inputName} value={customerComment} onChange={(e) => setCustomerComment(e.target.value)} placeholder={t('customerReviews-enter')}></textarea>
											</div>
										</div>
									</div>
									<Button
										variant="contained"
										size="medium"
										color="secondary"
										className={classes.newConstructionBtn}
										onClick={handleAddReport}
									>
										{t('Add')}
									</Button>
								</div>
							</>
						}
					</>
					: <div>{t('not-permission')} !</div>
			}
		</>



	);
}