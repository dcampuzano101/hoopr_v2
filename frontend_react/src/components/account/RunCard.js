import React from 'react';
import { getUsersForRun } from '../../actions/runActions';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/modalActions';


const RunCard = ({ run }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            runcardcomponent
        </>
    )
}

export default RunCard;