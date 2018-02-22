//wrap around code
//outer grid loop
let columns = 30, rows = 30, num = 10;
for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
        //inner convolution loop
        for (let y = -num; y <= num; y++) {
            for (let x = -num; x < num; x++) {
                //we use modulo to wrap around
                let col = (i + x + columns) % columns;
                let row = (j + y + rows) % rows;
                console.log([col, row])
            }
        }
    }
}