import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';

import {
	useHistory,
} from "react-router-dom";
import axios from 'axios';

function TableSupplies({rowsData, deleteTableRows, handleChange}) {
	const { t } = useTranslation();
    return(
        rowsData.map((data, index)=>{
			const {name, unit, quantity} = data;
            return(
                <tr key={index}>
                	<td>
                    	<input type="text" value={name} onChange={(evnt)=>(handleChange(index, evnt))} name="name" placeholder={t('enter-materials')} className="form-control"/>
                	</td>
                	<td><input type="text" value={unit} onChange={(evnt)=>(handleChange(index, evnt))} name="unit" placeholder={t('enter-unit')} className="form-control"/> </td>
                	<td><input type="text" value={quantity}  onChange={(evnt)=>(handleChange(index, evnt))} name="quantity" placeholder={t('enter-amount')} className="form-control" /> </td>
                	<td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            	</tr>
            );
        })
    )
}

function TableMaintenance({rowsData, deleteTableRows, handleChange}) {
	const { t } = useTranslation();
    return(
        rowsData.map((data, index)=>{
            const {name, image, description} = data;

            return(
                <tr key={index}>
                <td>
                    <input type="text" value={name} onChange={(evnt)=>(handleChange(index, evnt))} name="name" placeholder={t('enter-maintenance-equipment')} className="form-control"/>
                </td>
				<td>
					<input type="file" value={image} onChange={(evnt)=>(handleChange(index, evnt))} id="image" name="image" accept="image/png, image/jpeg, image/jpg" />
                </td>
                <td><input type="text" value={description}  onChange={(evnt)=>(handleChange(index, evnt))} name="description" placeholder={t('enter-maintenance-description')} className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>
            )
        })
    )
}

export default function NewReport2() {

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
		const result = await axios.get('https://backend.omcloud.vn/api/construction');
		setConstruction(result.data.data);
	};
	const Construction = construction.map(Construction => Construction);

	/* table row bảo trị */
    const addTableRowsMaintenance = () => {
        const rowsInputMaintenance = {
            name: '',
            image: '',
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
		formDataReport.append('tasks', rowMaintenance);
		formDataReport.append('items', rowSupplies);

		axios.post('https://backend.omcloud.vn/api/report', formDataReport)
        .then(res => {
          alert('Tạo báo cáo thành công!');
          history.push('/app/report');
        })
        .catch(error => console.log(error));

		// const report = {
		// 	name: name,
    	// 	code: code,
    	// 	publish_day: publishDay,
    	// 	publish_time: publishTime,
    	// 	representative_name: representativeName,
    	// 	address: address,
    	// 	construction_id: constructionId,
    	// 	frequency: frequency,
    	// 	valid_date: validDate,
    	// 	hicon_comment: hiconComment,
    	// 	customer_comment: customerComment,
    	// 	tasks: rowMaintenance,
    	// 	items: rowSupplies,
		// };

		// axios.post('https://backend.omcloud.vn/api/report', report)
        // .then(res => {
        //   alert('Tạo báo cáo thành công!');
        //   history.push('/app/report');
        // })
        // .catch(error => console.log(error));
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
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('title-name')}</label>
										<input type="text" name="name" className={classes.inputName} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('title-name-enter')} />
									</div>
                                    <div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('code-name')}</label>
										<input type="text" name="code" className={classes.inputName} value={code} onChange={(e) => setCode(e.target.value)} placeholder={t('code-name-enter')} />
									</div>
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
                                    <div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('dateIssued')}</label>
										<input type="text" name="publishDay" className={classes.inputName} value={publishDay} onChange={(e) => setPublishDay(e.target.value)} placeholder={t('dateIssued-enter')} />
									</div>
                                    <div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('timeIssued')}</label>
										<input type="text" name="publishTime" className={classes.inputName} value={publishTime} onChange={(e) => setPublishTime(e.target.value)} placeholder={t('timeIssued-enter')} />
									</div>
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('client-name')}</label>
										<input type="text" name="representativeName" className={classes.inputName} value={representativeName} onChange={(e) => setRepresentativeName(e.target.value)} placeholder={t('clientName-enter')} />
									</div>
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('address')}</label>
										<input type="text" name="address" className={classes.inputName} value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t('address-enter')} />
									</div>
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
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('date-test')} (*)</label>
									  	<input type="text" name="validDate" className={classes.inputName} value={validDate} onChange={(e) => setValidDate(e.target.value)} placeholder={t('dateTest-enter')} />
								  	</div>
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
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('hicon-reviews')} (*)</label>
										<textarea name="hiconComment" rows="4" cols="50" className={classes.inputName} value={hiconComment} onChange={(e) => setHiconComment(e.target.value)} placeholder={t('hiconReviews-enter')}></textarea>
									</div>
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('customer-reviews')} (*)</label>
										<textarea name="customerComment" rows="4" cols="50" className={classes.inputName} value={customerComment} onChange={(e) => setCustomerComment(e.target.value)} placeholder={t('customerReviews-enter')}></textarea>
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