import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';

import {
    useHistory,
    useParams,
  } from "react-router-dom";
import axios from 'axios';

const url = 'https://backend.omcloud.vn/api/task';

export default function EditTask() {
    var classes = useStyles();
	let history = useHistory();
	const { t } = useTranslation();

    const paramId = useParams();
    const currentTaskId = paramId.id;

    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
	const [description, setDescription] = useState('');
    const [reviewPhoto, setReviewPhoto] = useState('');


    useEffect(() => {
        loadTask();
      }, []);

    const loadTask = async () => {
        const result = await axios.get(url + '/' + currentTaskId);
        setName(result.data.data.name);
        setPhoto(result.data.data.photo);
        setDescription(result.data.data.name);
        setReviewPhoto(result.data.data.photo);
    };

    console.log(photo);

    const handleUpdateTask = (e) => {
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

            axios.post('https://backend.omcloud.vn/api/task/edit/' + currentTaskId, formDataTask)
			.then(res => {
				alert('Cập nhật thiết bị thành công!');
				history.push('/app/task');
			}).catch(error => console.log(error));
		}
    };

	return (
		<>
            <PageTitle title={t('Edit-List-device')} />
            <div className={classes.newConstructionForm}>
				<div className={classes.newConstructionItem}>
					<label className={classes.label}>{t('device-maintenance')}</label>
					<input type="text" name="name" className={classes.inputName} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('enter-device-maintenance')} />
				</div>
                <div className={classes.newConstructionItem}>
					<label className={classes.label}>{t('photo-maintenance')}</label>
					<input type="file" className={classes.inputName} onChange={(e) => setPhoto(e.target.files[0])} placeholder="Files" />
                    {reviewPhoto ? <img src={'http://backend.omcloud.vn/uploads/' + reviewPhoto} style={{width: '250px', marginTop: '20px'}} /> : ''}
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
					onClick={handleUpdateTask}
				>
					{t('btn-update')}
				</Button>
			</div>
		</>
	);
}