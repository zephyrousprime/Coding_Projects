## Guide to the Libarys
#### tabulator-master
    - link 
        - local
        <script src="../../00_Libarys\tabulator-master\dist\js\tabulator.min.js"></script>
        <link rel="stylesheet" href="../../00_Libarys\tabulator-master\dist\css\tabulator.min.css">
        - online
        <link href="https://unpkg.com/tabulator-tables@6.3.0/dist/css/tabulator.min.css" rel="stylesheet">
        <script src="https://unpkg.com/tabulator-tables@6.3.0/dist/js/tabulator.min.js"></script>
        - redowload
        https://github.com/olifolkerd/tabulator/releases
    - code
        - normle

        - var link
            var tabledata = [
            {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red", dob:"19/02/1984", car:1},
            {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue", dob:"14/05/1982", car:true},
            {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green", dob:"22/05/1982", car:"true"},
            {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange", dob:"01/08/1980"},
            {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow", dob:"31/01/1999"},
            {id:6, name:"Frank Harbours", progress:38, gender:"male", rating:4, col:"red", dob:"12/05/1966", car:1},
            ];
            var table = new Tabulator("#example-table", {
                data: tabledata,
                autoColumns: true,
            });
        - loping 
            function displayStats(stats) {
                const tableData = stats.drops.map((drop, index) => ({
                    id: index + 1,
                    name: drop.name,
                    theoretical_chance: `${drop.chance}%`,
                    amount_received: drop.value,
                    true_probability: `${(drop.value / input_number * 100).toFixed(0)}%`,
            }));
            table.setData(tableData);
            }
            function fetchData(value) {
                fetch(`${value}.json`)
                    .then(response => response.json())
                    .then(data => displayStats(data));
            }
            var table = new Tabulator("#example-table", {
                data: [],
                autoColumns: true,
            });
#### next one