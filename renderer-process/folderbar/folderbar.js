const fs = require('fs');
const { ipcRenderer } = require('electron');
const Vue = require('vue/dist/vue.common')

let folders = new Vue({
    data: {
        files: []
    },
    methods: {
        openFile: function(path, callback) {
            let temp = path.split('\\').reverse();
            let title = temp[0].split('.')[0];
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) throw err;
                let file = {
                    title: title,
                    content: data
                };
                ipcRenderer.send('to-open-file', file);
                callback(file);
            });
        },
        openAllFilesPath: function(path, directory, callback) {
            fs.readdir(path, (err, files) => {
                console.log(files)
                let dir = [];
                files.forEach(file => {
                    let p = path;
                    let q = process.platform == 'darwin' || 'win32' ? '\\' : '/';
                    let ph = p + q + file;
                    console.log(ph)
                    fs.stat(ph, (err, stat) => {
                        if (stat.isDirectory()) {
                            this.openAllFilesPath(ph, dir, () => {})
                        } else {
                            let temp = ph.split('\\').reverse();
                            let title = temp[0].split('.')[0];
                            let f = {
                                path: ph,
                                title: title
                            }
                            dir.push(f)
                        }
                    })
                });
                directory.push(dir);
                console.log(directory)
                return;
            })
        },
        openFilePath: function() {
            ipcRenderer.on('open-file-path', (event, path) => {
                this.openFile(path[0], (file) => {
                    this.files.push(file);
                });
            });
        },
        openDirectoryPath: function() {
            ipcRenderer.on('open-directory-path', (event, path) => {
                this.openAllFilesPath(path[0], this.files, () => {});
                console.log(this.files)
            })
        },
        ipc: function() {
            this.openFilePath();
            this.openDirectoryPath();
        }
    }
});
folders.ipc();
