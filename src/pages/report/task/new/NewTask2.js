import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';
import {useDropzone} from 'react-dropzone';

import {
	useHistory,
} from "react-router-dom";
import axios from 'axios';

const URL_UPLOAD_IMAGE = 'https://backend.omcloud.vn/uploads/images/';

export default function NewTask2() {
    var classes = useStyles();
	let history = useHistory();
	const { t } = useTranslation();

    const [name, setName] = useState('');
    const [files, setFiles] = useState([]);
	const [description, setDescription] = useState('');

    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            );
        }
    });

    const images = files.map((file) => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{width: '200px'}} alt="preview" />
            </div>
        </div>
    ));

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
            formDataTask.append('photo', files);
            formDataTask.append('description', description);
            // var url_file = 'images/' + files[0].path;

			axios.post({
                url: 'https://backend.omcloud.vn/api/task',
                data: formDataTask,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(res => {
                console.log(res);
				// alert('Thêm thiết bị thành công!');
				// history.push('/app/task');
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
					<div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className={classes.formDrag}>
                            <p className={classes.dragTitle}>{t('drag-photo')}</p>
                            <div className={classes.photoPreview}>{images}</div>
                        </div>
                    </div>
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