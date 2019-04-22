Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'));

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
		},
		sortedNotes() {
			return this.notes.slice()
					.sort((a, b) => a.created - b.created)
					.sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1 )
		},
		linesCount(){
			if(this.selectedNote) {
				return this.selectedNote.content.split("/\r\n|\r|\n/").length
			}
		},
		wordsCount() {
			if(this.selectedNote) {
				var s = this.selectedNote.content
 				// Turn new line cahracters into white-spaces
 				s = s.replace(/\n/g, ' ')
 				// Exclude start and end white-spaces
 				s = s.replace(/(^\s*)|(\s*$)/gi, '')
 				// Turn 2 or more duplicate white-spaces into 1
 				s = s.replace(/\s\s+/gi, ' ')
 				// Return the number of spaces
 				return s.split(' ').length
			}
		},
		charactersCount() {
			if (this.selectedNote) {
 				return this.selectedNote.content.split('').length
 			}
		}
	},
	methods:{
		saveNotes(val){
			console.log('saving note:', val);
			localStorage.setItem('notes', JSON.stringify(val));
			this.reportOperation('saving');
		},
		reportOperation (opName) {
			console.log('The', opName, 'notes was completed!')
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
		},
		favoriteNote(){
			this.selectedNote.favorite ^= true;
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
