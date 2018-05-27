const ADD_RECORD: string = 'ADD_RECORD';
const EDIT_RECORD: string = 'EDIT_RECORD';
const DELETE_RECORD: string = 'DELETE_RECORD';
const SET_FILTER: string = 'SET_FILTER';
const ADD_DOCTOR: string = 'ADD_DOCTOR';
const SET_CURRENT: string = 'SET_CURRENT';
const DELETE_DOCTOR: string = 'DELETE_DOCTOR';

export const addRecord = (description:string, startTime:string, endTime:string) => ({ type: ADD_RECORD, description, startTime, endTime });
export const deleteRecord = id => ({ type: DELETE_RECORD, id });
export const editRecord = (description:string, startTime:string, endTime:string) => ({ type: EDIT_RECORD, description, startTime, endTime }); 
export const setFilter = (spec: string) => ({type: SET_FILTER, spec});
export const addDoctor = (name: string, spec: string) => ({type: ADD_DOCTOR, name, spec});
export const setCurrent = (name: string) => ({type: SET_CURRENT, name});
export const deleteDoctor = (name: string) => ({type: DELETE_DOCTOR, name});