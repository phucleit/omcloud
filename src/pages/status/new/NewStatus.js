import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';

import {
	useHistory,
} from "react-router-dom";
import axios from 'axios';

export default function NewStatus() {

	var classes = useStyles();
	let history = useHistory();
	const { t } = useTranslation()

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [permission, setPermission] = useState(false)
	useEffect(() => {
		if (localStorage.abilities.includes("status-update"))
			setPermission(true)
		else setPermission(false)
	}, []);
	const handleAddStatus = (e) => {
		e.preventDefault();

		if (name === "") {
			alert("Vui lòng nhập tên trạng thái");
			return;
		} else if (description === "") {
			alert("Vui lòng nhập mô tả trạng thái");
			return;
		} else {
			const newStatus = {
				name: name,
				description: description,
			};

			axios.post('https://backend.omcloud.vn/api/status', newStatus)
				.then(res => {
					alert('Thêm trạng thái thành công!');
					history.push('/app/status');
				})
				.catch(error => console.log(error));
		}
	}

	return (
		<>
			{
				permission ?
					<>
						{
							<>
								<PageTitle title={t('Status-Add')} />
								<div className={classes.newConstructionForm}>
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t('status-name')}</label>
										<input type="text" name="name" className={classes.inputName} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('status-name-enter')} />
									</div>
									<div className={classes.newConstructionItem}>
										<label className={classes.label}>{t("status-desc")}</label>
										<textarea rows="4" name="description" className={classes.inputName} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t("status-desc-enter")}></textarea>
									</div>
									<Button
										variant="contained"
										size="medium"
										color="secondary"
										className={classes.newConstructionBtn}
										onClick={handleAddStatus}
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