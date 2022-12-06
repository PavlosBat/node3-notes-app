const fs = require('fs')
const chalk = require('chalk')

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJsON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
   
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green('New note added!'))
    } else {
        console.log(chalk.inverse.red('Note title taken!'))
    }       
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

     if (notes.length === notesToKeep.length) {
        console.log(chalk.inverse.red('Note not found!'))
    } else {
        console.log(chalk.inverse.green('Note removed)')) 
        saveNotes(notesToKeep)
    }
}

const listNotes = () => {
    console.log(chalk.inverse.blue('Your notes: '))

    const notes = loadNotes()
    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()

    const findNote = notes.find((note) => note.title === title)

    if (findNote) {
        console.log(chalk.bold.redBright(findNote.title) + ': ')
        console.log(findNote.body)
    }else {
        console.log(chalk.red('Note not found'))
    }    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

