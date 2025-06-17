import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const docListSlice = createSlice({
    name: "docList",
    initialState: {
        addDoc: [] as Array<IDoc>
    },
    reducers: {
        setNewAddDoc (state, action: PayloadAction<IDoc>) {
            state.addDoc.unshift(action.payload)
        },


        setAddDoc (state, action: PayloadAction<IDoc>) {
            state.addDoc.unshift(action.payload)
        },

        getAddDoc: state => {state}
    },
});

export const {setAddDoc, setNewAddDoc} = docListSlice.actions

export default docListSlice.reducer
