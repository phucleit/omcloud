import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';

import {
	useHistory,
} from "react-router-dom";
import axios from 'axios';

export default function NewReport() {

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

	const handleAddReport = (e) => {
		e.preventDefault();

		
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