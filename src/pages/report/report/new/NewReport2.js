import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';

import {
	useHistory,
} from "react-router-dom";
import axios from 'axios';

function TableSupplies2({rowsData, deleteTableRows, handleChange}) {
	const { t } = useTranslation();
    return(
        rowsData.map((data, index)=>{
            const {supplies, unit, amount} = data;
            return(
                <tr key={index}>
                <td>
                    <input type="text" value={supplies} onChange={(evnt)=>(handleChange(index, evnt))} name="supplies" placeholder={t('enter-materials')} className="form-control"/>
                </td>
                <td><input type="text" value={unit}  onChange={(evnt)=>(handleChange(index, evnt))} name="unit" placeholder={t('enter-unit')} className="form-control"/> </td>
                <td><input type="text" value={amount}  onChange={(evnt)=>(handleChange(index, evnt))} name="amount" placeholder={t('enter-amount')} className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>
            )
        })
    )
}

function TableMaintenance22({rowsData, deleteTableRows, handleChange}) {
	const { t } = useTranslation();
    return(
        rowsData.map((data, index)=>{
            const {equipment, pictures, description} = data;
            return(
                <tr key={index}>
                <td>
                    <input type="text" value={equipment} onChange={(evnt)=>(handleChange(index, evnt))} name="equipment" placeholder={t('enter-maintenance-equipment')} className="form-control"/>
                </td>
				<td>
					<input type="file" id="pictures" name="pictures" accept="image/png, image/jpeg" />
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
	const { t } = useTranslation()

	const [title, setTitle] = useState('');
	const [code, setCode] = useState('');
	const [dateIssued, setDateIssued] = useState('');
	const [timeIssued, setTimeIssued] = useState('');
	const [frequency, setFrequency] = useState('');
	const [dateTest, setDateTest] = useState('');
	const [clientName, setClientName] = useState('');
	const [address, setAddress] = useState('');
	const [construction, setConstruction] = useState([]);
	const [rowSupplies, setRowSupplies] = useState([]);
	const [rowMaintenance, setRowMaintenance] = useState([]);
	const [hiconReviews, setHiconReviews] = useState('');
	const [customerReviews, setCustomerReviews] = useState('');

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
            equipment:'',
            pictures:'',
            description:''  
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
            supplies:'',
            unit:'',
            amount:''  
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

	const handleAddReport = (e) => {
		e.preventDefault();

		const report = {
			title: title,
			code: code,
			dateIssued: dateIssued,
			timeIssued: timeIssued,
			dateTest: dateTest,
			clientName: clientName,
			address: address,
			rowMaintenance: rowMaintenance,
			rowSupplies: rowSupplies,
			hiconReviews: hiconReviews,
			customerReviews: customerReviews
		};
		console.log(report);
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
										<input type="text" name="title" className={classes.inputName} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('title-name-enter')} />
									</div>
                                    <div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('code-name')}</label>
										<input type="text" name="code" className={classes.inputName} value={code} onChange={(e) => setCode(e.target.value)} placeholder={t('code-name-enter')} />
									</div>
                                    <div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('dateIssued')}</label>
										<input type="text" name="dateIssued" className={classes.inputName} value={dateIssued} onChange={(e) => setDateIssued(e.target.value)} placeholder={t('dateIssued-enter')} />
									</div>
                                    <div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('timeIssued')}</label>
										<input type="text" name="timeIssued" className={classes.inputName} value={timeIssued} onChange={(e) => setTimeIssued(e.target.value)} placeholder={t('timeIssued-enter')} />
									</div>
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('client-name')}</label>
										<input type="text" name="clientName" className={classes.inputName} value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder={t('clientName-enter')} />
									</div>
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('address')}</label>
										<input type="text" name="address" className={classes.inputName} value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t('address-enter')} />
									</div>
									<div className={classes.newConstructionItem}>
                						<label className={classes.label}>{t('project')}</label>
                						<select
          									// onChange={e => handleTypeChange(e)}
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
                						<label className={classes.label}>{t('frequency')}</label>
                						<select
                  							className={classes.newConstructionType}
                  							id="newConstructionType"
                						>
											<option>--------</option>
                  							<option value="monthly">{t('monthly')}</option>
                  							<option value="quarterly">{t('quarterly')}</option>
                  							<option value="semi-yearly">{t('semi-yearly')}</option>
                  							<option value="yearly">{t('yearly')}</option>
                						</select>
              						</div>
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('date-test')}</label>
										<input type="text" name="dateTest" className={classes.inputName} value={dateTest} onChange={(e) => setDateTest(e.target.value)} placeholder={t('dateTest-enter')} />
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
                            					<TableMaintenance22 rowsData={rowMaintenance} deleteTableRows={deleteTableRowsMaintenance} handleChange={handleChangeMaintenance} />
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
                            					<TableSupplies2 rowsData={rowSupplies} deleteTableRows={deleteTableRowsSupplies} handleChange={handleChangeSupplies} />
                        					</tbody> 
                    					</table>
									</div>
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('hicon-reviews')}</label>
										<textarea name="hiconReviews" rows="4" cols="50" className={classes.inputName} value={hiconReviews} onChange={(e) => setHiconReviews(e.target.value)} placeholder={t('hiconReviews-enter')}></textarea>
									</div>
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('customer-reviews')}</label>
										<textarea name="customerReviews" rows="4" cols="50" className={classes.inputName} value={customerReviews} onChange={(e) => setCustomerReviews(e.target.value)} placeholder={t('customerReviews-enter')}></textarea>
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