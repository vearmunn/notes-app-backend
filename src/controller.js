import { nanoid } from 'nanoid';
import NoteRepositories from '../src/repositories/note-repositories.js';
// import notes from '../src/notes.js';

export const createNote = async (req, res, next) => {
    const { title = 'untitled', tags, body } = req.body;
    const note = await NoteRepositories.createNote({
        title,
        body,
        tags
    });

    if (!note) {
        return res.status(400).json({
            status: 'fail',
            message: 'Catatan gagal ditambahkan'
        });
    }


    return response(res, 201, 'Catatan berhasil ditambahkan', note);
};

export const getNotes = async (req, res) => {
    const notes = await NoteRepositories.getNotes();
    return res.json({
        status: 'success',
        notes
    });
};

export const getNoteById = async (req, res) => {
    const { id } = req.params;
    const note = await NoteRepositories.getNoteById(id);
    if (note) {
        return res.json({
            status: 'success',
            note
        });
    }
    return res.status(404).json({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    });
};

export const editNoteById = async (req, res) => {
    const { id } = req.params;
    const { title, tags, body } = req.body;

    const note = await NoteRepositories.editNote({
        id,
        title,
        body,
        tags
    });

    if (!note) {
        return res.status(404).json({
            status: 'fail',
            message: 'Catatan tidak ditemukan'
        });
    }
    return res.status(200).json({
        status: 'success',
        message: 'Catatan berhasil diperbarui'
    });
};

export const deleteNoteById = async (req, res) => {
    const { id } = req.params;
    const deletedNote = await NoteRepositories.deleteNote(id);

    if (!deletedNote) {
        return res.status(404).json({
            status: 'fail',
            message: 'Catatan gagal dihapus. Id tidak ditemukan'
        });

    }
    return res.json({
        status: 'success',
        message: 'Catatan berhasil dihapus'
    });
};