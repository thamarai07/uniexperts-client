import { getStudentTasks, updateStudentTaskData } from "apis/student";
import Tasks from "components/Tasks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const Task = ({ studentId }) => {
	const dispatch = useDispatch();

	const [taskList, setTaskList] = useState({});

	useEffect(() => {
		_fetchTasks();
	}, []);

	const _fetchTasks = () => {
		dispatch(setLoader(true));

		const tempTaskList = {};

		getStudentTasks(studentId)
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

		updateStudentTaskData({
			studentId,
			taskId,
			data: data?.url ?? data,
		})
			.then(_fetchTasks())
			.finally(dispatch(setLoader(false)));
	};

	return <Tasks taskList={taskList} updateInformation={updateInformation} />;
};

export default Task;
