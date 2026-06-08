## Guide to the Libarys
#### tabulator-master
    - https://tabulator.info/docs/6.4
    - Link 
        - local
        <script src="../../00_Libarys\tabulator-master\dist\js\tabulator.min.js"></script>
        <link rel="stylesheet" href="../../00_Libarys\tabulator-master\dist\css\tabulator.min.css">
        - online/ CDN
        <link href="https://unpkg.com/tabulator-tables@6.3.0/dist/css/tabulator.min.css" rel="stylesheet">
        <script src="https://unpkg.com/tabulator-tables@6.3.0/dist/js/tabulator.min.js"></script>
        - redowload
        https://github.com/olifolkerd/tabulator/releases
    - Code
        - basic
        
            ```JS
            new Tabulator("#example-table", {
            layout:"fitColumns",
            data:[
                {id:1, name:"John", age:20},
                {id:2, name:"Sarah", age:18},
                {id:3, name:"Mike", age:22},
            ],
            columns:[
                {title:"ID", field:"id"},
                {title:"Name", field:"name"},
                {title:"Age", field:"age"},
            ],
            });
            
            ```
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
#### anime-master
    - https://animejs.com/documentation/getting-started/installation/
    - Link
        - local
            import { animate } from '../../00_Libarys/anime-master/dist/bundles/anime.esm.min.js';
        - online/ CDN
            <script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"></script>
        - redowlad 
            https://github.com/juliangarnier/anime/tree/master
    - Code
        - basic
            <div id="box" style="background:#3498db; width:50px; height:50px;"></div>
            <script>
            anime({
                targets: '#box',
                translateX: 250,
                scale: 1.5,
                duration: 2000,
                easing: 'easeInOutQuad',
                direction: 'alternate',
                loop: true
            });
            </script>
