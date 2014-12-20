function loadViews(basePath) {
	// iterate over all wrappers and load their chart contents
	$(".wrapper").each(function() {
		loadViewContent($(this), basePath);
	});
}

function convertHc(old, title, type){
	var ret={};
	id=old.chartId.split('chart_')[1].split('_')[0];
	ret.chart={};
	ret.chart.renderTo='hc-'+id;
	ret.chart.type=type;
	
	ret.title={};
	ret.title.text=title;
	
	ret.credits={};
	ret.credits.enabled=false;
	
//	ret.yAxis={};
//	ret.yAxis.title={};
//	ret.yAxis.title.text='testY';
	
	ret.xAxis={};
	ret.xAxis.categories=old.x_axis.labels.labels;
	
	ret.series=[];
	
	for (var i=0; i<old.elements.length; i++){
		ret.series.push({});
		ret.series[i].name=old.elements[i].text;
		ret.series[i].data=[];
		for (var j=0; j<old.elements[i].values.length; j++){
			if (old.elements[i].values[j]==null)
				ret.series[i].data.push(null);
			else if (type=='column')
				ret.series[i].data.push(old.elements[i].values[j].top);
			else if (type=='line')
				ret.series[i].data.push(old.elements[i].values[j].value);
		}
	}	
	return ret;
}

function convertEc(old, title, type){
	var ret={};
	
	ret.toolbox={
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    };
	
	ret.tooltip ={
        trigger: 'axis'
    };
	
	ret.title={};
	ret.title.text=title;
	
	ret.xAxis=[];
	ret.xAxis.push({});
	ret.xAxis[0].type='category';
	ret.xAxis[0].data=old.x_axis.labels.labels;
	
	ret.yAxis=[];
	ret.yAxis.push({});
	ret.yAxis[0].type='value';
	
	ret.series=[];
	
	ret.legend={};
	ret.legend.data=[];
	
	for (var i=0; i<old.elements.length; i++){
		ret.series.push({});
		ret.series[i].name=old.elements[i].text;
		ret.legend.data.push(ret.series[i].name);
		ret.series[i].type=type;
		ret.series[i].data=[];
		for (var j=0; j<old.elements[i].values.length; j++){
			if (old.elements[i].values[j]==null)
				dat=null;
			else if (type=='bar')
				dat=old.elements[i].values[j].top;
			else if (type=='line')
				dat=old.elements[i].values[j].value;
			ret.series[i].data.push(dat==null?0:dat);
		}
	}
	return ret;
}

function loadViewContent(wrapper, basePath, interval, filterValues) {
	var id = wrapper.data("view-id"); // ID of the chart
	var title = wrapper.data("view-name");  // title of the chart
	var url = basePath + "/showchart?id="+id;
	var $container = wrapper.find(".chart");
	
	// clear any existing content from the chart container
	$container.empty();
	
	// get the chart contents from our server
	$.get(url, { interval: JSON.stringify(interval), filterValues: JSON.stringify(filterValues) }, function(response) {
		
		// create the chart and display it
		console.time('old');
		var chart = Charts.create("chart-" + id, response.content);
		chart.resize($container.width(), $container.height());
		console.timeEnd('old');
		
		// create highcharts
		console.time('highchart');
		if (response.content.elements[0].type=='bar')
			hc_data=convertHc(response.content, title, 'column');
		else if (response.content.elements[0].type=='line')
			hc_data=convertHc(response.content, title, 'line');
		(hc_data!=null) && (chart_hc = new Highcharts.Chart(hc_data));
		console.timeEnd('highchart');
		
		// create echarts
		console.time('echart');
		if (response.content.elements[0].type=='bar')
			ec_data=convertEc(response.content, title, 'bar');
		else if (response.content.elements[0].type=='line')
			ec_data=convertEc(response.content, title, 'line');
		var chart_ec = echarts.init(document.getElementById('ec-'+id));
		chart_ec.setOption(ec_data);
		console.timeEnd('echart');
	});
}

function initInteractions($selectContainer, initialInterval, $filterContainer, basePath) {
	// helper function to set month and year values
	var setValues = function($innerContainer, date) {
		$innerContainer.find("[name=month]").val(date.month);
		$innerContainer.find("[name=year]").val(date.year);
	};
	
	var resetValues = function() {
		if($selectContainer.length > 0) {
			// set from and to dates in the respective select boxes
			setValues($selectContainer.find(".date-from"), initialInterval.dateInterval.interval.from);
			setValues($selectContainer.find(".date-to"), initialInterval.dateInterval.interval.to);
		}
		if($filterContainer.length > 0) {
			$filterContainer.find(".filter-value").prop("checked", false);
		}
	};
	
	resetValues();
	
	var updateContents = function() {
		var interval = null;
		var filterValues = [];

		if($selectContainer.length > 0) {
			// build an interval object containing the selected from and to date
			interval = { from: {}, to: {} };
			interval.from.year = $selectContainer.find(".date-from [name=year]").val();
			interval.from.month = $selectContainer.find(".date-from [name=month]").val();
			interval.to.year = $selectContainer.find(".date-to [name=year]").val();
			interval.to.month = $selectContainer.find(".date-to [name=month]").val();
		}
		
		$filterContainer.find(".filter-value").each(function() {
			// get all selected filter values
			if($(this).is(":checked")) {
				filterValues.push(this.id);
			}
		});
		
		$(".wrapper").each(function() {
			if($(this).is("[data-use-date-interval=true]")) {
				// reload all views that use the interval
				loadViewContent($(this), basePath, interval, filterValues);
			} else {
				// reload all other views
				loadViewContent($(this), basePath, undefined, filterValues);
			}
		});
	};
	
	$(".content-update .update").click(updateContents);
	$(".content-update .reset").click(function() {
		resetValues();
		updateContents();
	});
}