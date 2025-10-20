import Note from "../models/Note.js"

export async function getAllNotes(req,res)  {
 try{
    const notes = await Note.find().sort({createdAt: -1}) // -1 will sort in desc order
    res.status(200).json(notes)
 }catch(error){
    console.log("Error in getAllNOtes.controller",error);
    res.status(500).json({message : "Internal server error"})
 }
 }


export async function getNoteById(req, res) {
  try {
    const { id } = req.params

    // Find the note by ID
    const selectedNote = await Note.findById(id)

    if (!selectedNote) {
      return res.status(404).json({ message: "Note not found" })
    }

    // Send the found note
    return res.status(200).json(selectedNote)

  } catch (error) {
    console.log("Error in getNoteById controller", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}


 export async function createNote (req,res)  {
   try {
    const{title,content} = req.body;
    const note = new Note({title, content});

    const savedNote = await note.save();
    res.status(201).json({savedNote});
   } catch (error) {
     console.error("Error in createNote.controller",error);
    res.status(500).json({message : "Internal server error"});
   }
}

export async function updateNote (req,res)  {
  try {
   const {title,content} = req.body
  const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{
   new: true
  })
  if(!updatedNote) return res.status(404).json({message:"Note not found"})

   res.status(200).json({updatedNote})
  } catch (error) {
    console.error("Error in updateeNote.controller",error);
    res.status(500).json({message : "Internal server error"});
  }
}

export async function deleteNote (req,res) {
 try {
   const{title,content}= req.body
   const deletedNote = await Note.findByIdAndDelete(req.params.id,{title,content})
   if(!deletedNote) return res.status(404).json({message:"Note not found"});
      res.status(200).json({message:"Note deleted successfully"});
 } catch (error) {
   console.error("Error in deleteNote.controller",error);
    res.status(500).json({message : "Internal server error"});
 }
}



