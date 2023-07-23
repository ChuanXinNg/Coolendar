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
            <div id="actualDiaryList">
                {todoTable.length == 0 ? (
                    <div>Have a Great Day!!!</div>
                ) : (
                    todoTable.map(x => (
                        <div key={x.id} style={{margin:"5px", borderBottom:"solid", borderBottomWidth:"1px"}}>
                            <div> <span style={{fontSize:"18px"}}>{x.todo_task}</span>
                            <input type="checkbox" onClick={() => handleToggleTodoDone(x.id, x.done)}/>
                            </div>
                            <div> Due: {x.deadline_date}, {x.has_dueTime ? formatTime(x.deadline_time) : 'Time is not set.'} </div>
                        </div>
                    ))
                )}
                
            </div>
        </div >
    );
}

export default TodoUndoneList;
