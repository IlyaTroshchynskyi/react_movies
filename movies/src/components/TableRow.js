import {Link} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../http_queries/client";
import {useState} from "react";
import ModalConfirmation from "./ModalConfirmation";

function TableRow(props) {
    const [isDeleting, setDeleting] = useState(false)

    const dataKeys = []
    for (const key in props.dataRow) {
        dataKeys.push(key)
    }

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: props.deleteRecordFunc,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [props.queryKey]})
        }
    })

    async function deleteConfirmHandler(objId) {
        mutate({objId: objId})
        setDeleting(false)
    }


    function cancelHandler() {
        setDeleting(false)
    }

    let content;

    if (isError) {
        props.setDeletingError(error.message)
    }

    return (
        <>
            {content}
            {(isDeleting || isPending) && <ModalConfirmation onClose={cancelHandler}
                                                             onDelete={deleteConfirmHandler.bind(null, props.dataRow.id)}/>}
            <tr key={props.dataRow.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                {
                    dataKeys.map((key) => (
                        <td key={key} className="px-6 py-4">
                            {Array.isArray(props.dataRow[key]) === false ? props.dataRow[key] || '-' : props.dataRow[key].map(item => item.name).join(',') || '-'}
                        </td>
                    ))
                }


                <td className="px-6 py-4">
                    <Link to={props.dataRow.id + '/' + props.resourcePath}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                    </Link>
                </td>
                <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => setDeleting(true)}
                    >
                        Delete
                    </button>
                </td>

            </tr>

        </>
    )
}

export default TableRow
