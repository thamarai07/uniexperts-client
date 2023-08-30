import {
	getApplicationTasks,
	updateApplicationTaskData,
} from "apis/application";
import Tasks from "components/Tasks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const ApplicationRequirement = ({ applicationId }) => {
	const dispatch = useDispatch();

	const [taskList, setTaskList] = useState({});

	useEffect(() => {
		_fetchTasks();
	}, []);

	const _fetchTasks = () => {
		dispatch(setLoader(true));

		const tempTaskList = {};

		getApplicationTasks(applicationId)
			.then(response => {
				response?.forEach(task => {
					const { details, ...restData } = task || {};

					// eslint-disable-next-line no-prototype-builtins
					if (!tempTaskList.hasOwnProperty(details?.type)) {
						tempTaskList[details?.type] = [];
					}

					tempTaskList[details.type].push({
						...details,
						...restData,
					});
				});

				setTaskList(tempTaskList);
			})
			.finally(dispatch(setLoader(false)));
	};

	const updateInformation = ({ taskId, data }) => {
		dispatch(setLoader(true));

		updateApplicationTaskData({
			applicationId,
			taskId,
			data: data?.url ?? data,
		})
			.then(_fetchTasks())
			.finally(dispatch(setLoader(false)));
	};

	return <Tasks taskList={taskList} updateInformation={updateInformation} />;
};

export default ApplicationRequirement;
