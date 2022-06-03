import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';

import {
	useHistory,
} from "react-router-dom";
import axios from 'axios';

export default function NewTask() {
    var classes = useStyles();
	let history = useHistory();
	const { t } = useTranslation();

    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
	const [description, setDescription] = useState('');

    const handleAddTask = (e) => {
		e.preventDefault();

        if (name === "") {
			alert("Vui lòng nhập thiết bị bảo trì");
			return;
		} else if (description === "") {
			alert("Vui lòng nhập mô tả công việc bảo trì");
			return;
		} else {
            const formDataTask = new FormData();
            formDataTask.append('name', name);
            formDataTask.append('photo', photo);
            formDataTask.append('description', description);

            axios.post('https://backend.omcloud.vn/api/task', formDataTask)
			.then(res => {
				alert('Thêm thiết bị thành công!');
				history.push('/app/task');
			}).catch(error => console.log(error));
		}
    };

	return (
		<>
            <PageTitle title={t('Add-List-device')} />
            <div className={classes.newConstructionForm}>
				<div className={classes.newConstructionItem}>
					<label className={classes.label}>{t('device-maintenance')}</label>
					<input type="text" name="name" className={classes.inputName} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('enter-device-maintenance')} />
				</div>
                <div className={classes.newConstructionItem}>
					<label className={classes.label}>{t('photo-maintenance')}</label>
					<input type="file" className={classes.inputName} onChange={(e) => setPhoto(e.target.files[0])} placeholder="Files" />
				</div>
				<div className={classes.newConstructionItem}>
					<label className={classes.label}>{t("des-maintenance")}</label>
					<textarea rows="4" name="description" className={classes.inputName} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t("enter-des-maintenance")}></textarea>
				</div>
				<Button
					variant="contained"
					size="medium"
					color="secondary"
					className={classes.newConstructionBtn}
					onClick={handleAddTask}
				>
					{t('Add')}
				</Button>
			</div>
		</>
	);
}