const fs = require('fs');
const { input_dir, startfolder, output_dir, folder_change, counter, file_Name, file_extensions } = require('.');

const renamex = () => {
        fs.readdir(input_dir, (err, items) => {
                    items.forEach((item) => {
                                if (startfolder) {
                                    fs.rename(input_dir + `/${item}`, output_dir + `/${folder_change + `${counter}`}`, (err) => {
                    if (err) throw err;
                    console.log('Rename complete!');
                });

            } else {
                fs.rename(input_dir + `/${item}`, output_dir + `/${file_Name + counter + file_extensions}`, (err) => {
                    if (err) throw err;
                    console.log('Rename complete!');
                });
            }
            counter++;

        });
        console.log(err);

    });

};
exports.renamex = renamex;