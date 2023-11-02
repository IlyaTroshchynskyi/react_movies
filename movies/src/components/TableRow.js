import {Link} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {deleteGenre} from "../http_queries/httpsQueriesGenres";
import {queryClient} from "../http_queries/client";
import {useState} from "react";
import ModalConfirmation from "./ModalConfirmation";

function TableRow(props) {
    const [isDeleting, setDeleting] = useState(false)

    const genreKeys = []
    for (const key in props.dataRow) {
        genreKeys.push(key)
    }

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: deleteGenre,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['genres']})
        }
    })


    async function deleteConfirmHandler(genreId) {
        mutate({genreId: genreId})
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
                    genreKeys.map((key) => <td key={key} className="px-6 py-4"> {props.dataRow[key]}</td>)
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
