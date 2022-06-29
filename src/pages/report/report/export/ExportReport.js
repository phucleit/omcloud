import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';
import 'tui-image-editor/dist/tui-image-editor.css';
import {
	useHistory,
	useParams
} from "react-router-dom";
import axios from 'axios';
import '../new/custom.css';

const url = 'https://backend.omcloud.vn/api/report';

function TableDataTask({rowsData}) {
	var classes = useStyles();
	return(
		rowsData.map((data, index) => {
			return(
				<tr key={index}>
					<td><input type="text" value={data.name} className={classes.inputName} /></td>
					<td>
						{
							data.report_task.map((image, i) => {
								return(
									<img key={i} src={`https://backend.omcloud.vn/uploads/` + image.photo} width="150px" style={{padding: '8px'}} />
								)
							})
						}
					</td>
					<td><input type="text" value={data.description} className={classes.inputName} /></td>
				</tr>
			);
		})
	);
}

function TableDataItem({rowsData}) {
	var classes = useStyles();
	return(
		rowsData.map((data, index) => {
			return(
				<tr key={index}>
					<td><input type="text" value={data.item_name} className={classes.inputName} /></td>
					<td><input type="text" value={data.item_unit} className={classes.inputName} /></td>
					<td><input type="text" value={data.item_quantity} className={classes.inputName} /></td>
				</tr>
			);
		})
	);
}

export default function ExportReport() {

	var classes = useStyles();
	let history = useHistory();
	const { t } = useTranslation();

	const paramId = useParams();
    const currentReportId = paramId.id;

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
	const [ task, setTask ] = useState([]);
	const [ item, setItem ] = useState([]);

	const [ constructionName, setConstructionName ] = useState('');

	const [permission, setPermission] = useState(false)
	useEffect(() => {
		if (localStorage.abilities.includes("construction-report"))
			setPermission(true)
		else setPermission(false)
		loadReport();
		loadConstruction();
	}, []);

	const loadReport = async () => {
        const result = await axios.get(url + '/' + currentReportId);
        setName(result.data.data.name);
        setCode(result.data.data.code);
        setConstructionName(result.data.data.construction.id);
        setPublishDay(result.data.data.publish_day);
        setPublishTime(result.data.data.publish_time);
        setRepresentativeName(result.data.data.representative_name);
        setAddress(result.data.data.address);
        setFrequency(result.data.data.frequency);
        setValidDate(result.data.data.valid_date);
        setHiconComment(result.data.data.hicon_comment);
        setCustomerComment(result.data.data.customer_comment);
		setTask(result.data.data.task);
		setItem(result.data.data.item);
    };

	/* load construction */
	const loadConstruction = async () => {
		const result = await axios.get('https://backend.omcloud.vn/api/construction');
		setConstruction(result.data.data);
	};
	const Construction = construction.map(Construction => Construction);

	const handleFrequencyChange = (e) => {
		e.preventDefault();
		setFrequency(e.target.value);
	}

	const handleContructionsChange = (e) => {
		e.preventDefault();
		setConstructionId(e.target.value);
	}
	
	const handleExportReport = (e) => {
		e.preventDefault();

	}

	return (
		<>
			{
				permission ?
					<>
						{
							<>
								<PageTitle title={t('btn-export')} />
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
													value={constructionName}
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
													value={frequency}
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
											  			</tr>
										  			</thead>
										  			<tbody>
														<TableDataTask rowsData={task} />
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
  														</tr>
													</thead>
													<tbody>
														<TableDataItem rowsData={item} />
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
										onClick={handleExportReport}
									>
										{t('btn-export')}
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