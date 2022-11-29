const fs = require('fs');
const fsPromises = require('fs').promises;
let FH = "";

fs.readFile('test.fh',(err,data)=>{
    if (err) throw err;
    FH = data.toString();
    const word = FH.replace(/[\r\n]/g,"");
    const arr = word.split(';');
    arr.length = arr.length-1;
    console.log(FH+"\n運行中......\n");
    let mathod =[];
    const prifix = ['ADD(','DELETE(','RENAME('];
    arr.forEach( (e,i) => {
        prifix.forEach( (e2,i2) => {
            if(e.substring(0,e2.length)===e2){
                mathod.push(e2);
            }
        })
    });
    mathod = mathod.map(x => x.substring(0,x.length-1));
    console.log("你寫入的:"+mathod);
    mathod.forEach((e3,i3)=>{
        console.log(arr[i3].substring(mathod[i3].length+1,arr[i3].length-1));
        let add = arr[i3].substring(mathod[i3].length+1,arr[i3].length-1).split(',');
        switch(e3){
            case"ADD":
                console.log(e3)
                if(add[1]==='file'){
                    fs.appendFile("./"+add[0],"",(err)=>{
                        if(err)throw err;
                        console.log('Updated File '+add[0]);
                    })
                }
                else if(add[1]==='folder'){
                    if(!fs.existsSync("./"+add[0])){
                        fs.mkdir("./"+add[0],(err)=>{
                            if (err) throw err;
                            console.log('Updated Folder '+add[0]);
                        })
                    } 
                }
                else{
                    console.log('Updated Folder failure');
                }
            break;
            case"DELETE":
                if(add[1]==='file'&&fs.existsSync("./"+add[0])){
                    fs.unlink("./"+add[0],(err)=>{
                        if (err) throw err;
                        console.log('Deleted File '+add[0]);
                    })
                }
                else if(add[1] = 'folder'&&fs.existsSync("./"+add[0])){
                    fs.rmdir("./"+add[0],(err)=>{
                        if (err) throw err;
                        console.log('Deleted Folder '+add[0]);
                    })
                }
                else{
                    console.log('Deleted Folder failure');
                }
            break;
            case"RENAME":
                if(fs.existsSync("./"+add[0])&&!fs.existsSync("./"+add[1])){
                    fs.rename(add[0],add[1],(err)=>{
                        if(err)throw err;
                        console.log(`Rename ${add[0]} to ${add[1]}`);
                    })
                }
                else{
                    console.log(`Rename failure`);
                }
            break;
        }
    })
})
