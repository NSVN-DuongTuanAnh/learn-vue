new Vue({
	el:"#app",
	data() {
		return {
			content:'default content',
			notes: JSON.parse(localStorage.getItem('notes')) || [],
			selectedId: localStorage.getItem('selectedId') || null
		}
	},
	created(){
		this.content = localStorage.getItem('content') ||  'You can write in **markdown**';
	},
	computed:{
		previewNote() {
			return this.selectedNote ? marked(this.selectedNote.content) : '';
		},
		addTitlebutton() {
			return this.notes ? this.notes.length + ' note(s) already' : '';
		},
		selectedNote() {
			return this.notes.find(note => note.id === this.selectedId);
		}
	},
	methods:{
		saveNotes(val){
			console.log('saving note:', val);
			localStorage.setItem('notes', JSON.stringify(val));
			this.reportOperation('saving');
		},
		reportOperation (opName) {
			console.log('The', opName, 'operation was completed!')
		},
		addNote() {
			const time = Date.now();
			const note = {
				id: String(time),
				title: 'New note ' + (this.notes.length + 1),
				content: marked(this.content),
				created: time,
				favorite: false
			};

			this.notes.push(note);
 			// this.content = '';
 		},
 		selectNote(note) {
 			this.selectedId = note.id;
 		},
 		removeNote(note) {
			if(this.selectedNote && confirm('delete nhe')) {
				const index = this.notes.indexOf(this.selectedNote);
				if(index !== -1) {
					this.notes.splice(index, 1);
				}
			}	
		}
 	},
 	watch:{
 		notes:{
 			handler:'saveNotes',
 			deep:true
 		},
 		selectedId(val) {
 			localStorage.setItem('selectedId', val);
 		}
 	}

 });