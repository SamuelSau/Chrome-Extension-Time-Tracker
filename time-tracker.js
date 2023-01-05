// Load the Google Charts library and specify a callback function
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(createPieChart);

function createPieChart() {
    // Retrieve the time spent on the page from the chrome.storage API
    chrome.storage.local.get(location.href, function (items) {
        let timeSpent = items[location.href] || 0;

        // Create the data table for the pie chart
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Category');
        data.addColumn('number', 'Time');
        data.addRows([
            ['Time Spent on Page', timeSpent],
            ['Time Not Spent on Page', 100 - timeSpent],
        ]);

        // Set the options for the pie chart
        let options = {
            title: 'Time Spent on Page',
            width: 400,
            height: 300,
        };

        // Create the pie chart
        let chart = new google.visualization.PieChart(
            document.getElementById('pie-chart')
        );
        chart.draw(data, options);
    });
}