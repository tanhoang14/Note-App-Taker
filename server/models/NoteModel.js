import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    content:{
        type:String,
    },
    folderId:{
        type:String,
        required:true,
    },
},{timestamps:true})

const NoteModel = mongoose.model('Note', folderSchema);
export default NoteModel;