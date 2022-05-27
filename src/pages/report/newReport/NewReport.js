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

	const [permission, setPermission] = useState(false)
	useEffect(() => {
		if (localStorage.abilities.includes("construction-report"))
			setPermission(true)
		else setPermission(false)
	}, []);
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