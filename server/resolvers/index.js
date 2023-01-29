import fakeData from '../fakeData/index.js'
import { AuthorModel, FolderModel, NoteModel } from '../models/index.js';
export const resolvers = {
    Query:{
        folders: async (parent, args, context) =>{ 
            const folders = await FolderModel.find({
                authorId: context.uid,
            }).sort({
                updatedAt: 'desc'
            });
            return folders
            // return fakeData.folders
        },
        folder: async (parent,args) =>{
            const folderId = args.folderId;
            const foundFolder = await FolderModel.findById(folderId)
            return foundFolder;
        },
        note:async (parent,args) =>{
            const noteId = args.noteId;
            const note = await NoteModel.findById(noteId);
            return note;
        }
    },
    Folder:{
        author:async (parent, args)=>{ 
        console.log({parent,args}); 
        const authorId = parent.authorId;
        const author = await AuthorModel.findOne({
            uid: authorId
        })
        return author;
        },
        notes:async (parent,args) =>{
            const notes = await NoteModel.find({
                folderId : parent.id
            })
            return notes;
        }
    },
    Mutation:{
        addNote: async(parent,args)=>{
            const newNote = new NoteModel(args)
            await newNote.save();
            return newNote;
        },
        updateNote: async(parent,args)=>{
            const noteId = args.id;
            const note = await NoteModel.findByIdAndUpdate(noteId,args);
            return note;
        },
        addFolder: async (parent,args,context)=>{
            const newFolder = new FolderModel({...args, authorId:context.uid});
            await newFolder.save();
            return newFolder
        },
        register : async (parent,args)=>{
            const foundUser = await AuthorModel.findOne({uid: args.uid});

            if(!foundUser){
                const newUser = new AuthorModel(args);
                await newUser.save();
                return newUser;
            }
            return foundUser;
        }
    }
};