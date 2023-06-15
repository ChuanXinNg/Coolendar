import React, { useState, useEffect } from "react";
import { supabase } from '../../../supabase';
import PropTypes from 'prop-types';

function TodoUndoneList({ token }) {

    // i have no idea what this is
    TodoUndoneList.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };

    // const select and delete
    const [todoTable, setTodoTable] = useState([]);


    // fetching data from database
    useEffect(() => {
        const fetchTodoTable = async () => {
            try {
                const user_id = token.user.id;
                const { data, error } = await supabase
                    .from('todotable')
                    .select()
                    .order('deadline_date', { ascending: true })
                    .order('deadline_time', { ascending: true })
                    .order('id', { ascending: false })
                    .eq('creator_id', user_id)
                    .eq('done', false);

                if (error) {
                    throw error;
                }

                setTodoTable(data.map(item => ({ ...item, id: item.id })));
                console.log(data);

            } catch (err) {
                console.log(err);
            }
        };
        fetchTodoTable();
    }, []);

    async function handleToggleTodoDone(id, done) {
        try {
            const { data, error } = await supabase
                .from('todotable')
                .update({ done: !done })
                .eq('id', id);

            if (error) {
                throw error;
            }

            console.log(data);

            const updatedTodo = todoTable.map(item => {
                if (item.id === id) {
                    return { ...item, done: !done };
                }
                return item;
            });

            location.reload();
            setTodoTable(updatedTodo);
        } catch (err) {
            console.log(err);
        }
    }

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        let formattedHours = parseInt(hours, 10);
        if (formattedHours >= 0 && formattedHours < 10) {
            // morning before 10am
            return `0${formattedHours}:${minutes}am`;
        } else if (formattedHours >= 10 && formattedHours < 12) {
            // morning after 10am and before afternoon 12pm
            return `${formattedHours}:${minutes}pm`;
        } else if (formattedHours == 12) {
            // afternoon on 12pm
            return `${formattedHours}:${minutes}pm`;
        } else if (formattedHours > 12 && formattedHours < 22) {
            // afternoon after 12pm and before 10pm
            formattedHours = formattedHours - 12;
            return `0${formattedHours}:${minutes}pm`;
        } else if (formattedHours >= 22 && formattedHours < 24) {
            // afternoon after 10pm
            formattedHours = formattedHours - 12;
            return `${formattedHours}:${minutes}pm`;
        } else {
            return 'Bad Timing. Invalid Timing input.'
        }
    }


    return (
        <div className="todolist">
            <div className="todosListTitle">
                Your todo List (This is from todo-done-List)
            </div>
            <div id="actualDiaryList">
                {todoTable.map(x => (
                    <div key={x.id}>
                        <div> Task: {x.todo_task} </div>
                        <div> Time: {x.deadline_date} </div>
                        <div> Time: {formatTime(x.deadline_time)} </div>
                        <button onClick={() => handleToggleTodoDone(x.id, x.done)}>
                            {x.done ? "Mark as Not Done" : "Mark as Done"}
                        </button>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default TodoUndoneList;
