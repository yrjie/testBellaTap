package com.ruijie.testBellaTap.pages;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;

import org.apache.tapestry5.StreamResponse;
import org.apache.tapestry5.annotations.*;
import org.apache.tapestry5.ioc.annotations.Inject;
import org.apache.tapestry5.json.JSONObject;
import org.apache.tapestry5.services.Request;
import org.apache.tapestry5.services.Session;
import org.apache.tapestry5.util.TextStreamResponse;

import com.belladati.sdk.BellaDatiService;
import com.belladati.sdk.exception.interval.InvalidIntervalException;
import com.belladati.sdk.filter.FilterOperation;
import com.belladati.sdk.filter.FilterValue;
import com.belladati.sdk.filter.Filter.MultiValueFilter;
import com.belladati.sdk.intervals.AbsoluteInterval;
import com.belladati.sdk.intervals.DateUnit;
import com.belladati.sdk.view.ViewLoader;
import com.belladati.sdk.view.ViewType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.ruijie.testBellaTap.services.ServiceManager;

public class ShowChart {
	
	@Inject
	Request request;
	
	@Property
	@Persist
	String id;
	
	@Persist
	private Session session;
	
	/** Hardcoded ID of the data set */
	private static final String DATA_SET_ID = "18812";

	/** Hardcoded ID of the attribute used to filter */
	private static final String ATTRIBUTE_CODE = "L_PRODUCT";
	
	StreamResponse onActivate() {
		String chartId=request.getParameter("id");
		String intervalString=request.getParameter("interval");
		String filterString=request.getParameter("filterValues");
		session=request.getSession(true);
		
        ViewLoader loader = ServiceManager.getService(session).createViewLoader(chartId, ViewType.CHART);

		// always exclude items with a blank product name
		loader.addFilters(FilterOperation.NOT_NULL.createFilter(ServiceManager.getService(session), DATA_SET_ID, ATTRIBUTE_CODE));

		if (intervalString != null) {
			try {
				JsonNode interval = new ObjectMapper().readTree(intervalString);
				Calendar from = new GregorianCalendar(interval.get("from").get("year").asInt(), interval.get("from").get("month")
					.asInt() - 1, 1);
				Calendar to = new GregorianCalendar(interval.get("to").get("year").asInt(), interval.get("to").get("month")
					.asInt() - 1, 1);
				AbsoluteInterval<DateUnit> dateInterval = new AbsoluteInterval<DateUnit>(DateUnit.MONTH, from, to);

				// if all is successful, use the interval when loading the chart
				loader.setDateInterval(dateInterval);
			} catch (IOException e) {} catch (InvalidIntervalException e) {}
		}

		if (filterString != null) {
			try {
				ArrayNode interval = (ArrayNode) new ObjectMapper().readTree(filterString);
				if (interval.size() > 0) {
					MultiValueFilter filter = FilterOperation.IN.createFilter(ServiceManager.getService(session), DATA_SET_ID, ATTRIBUTE_CODE);
					for (JsonNode value : interval) {
						filter.addValue(new FilterValue(value.asText()));
					}

					// if all is successful,
					// use the filter when loading the chart
					loader.addFilters(filter);
				}
			} catch (IOException e) {}
		}

		// load the chart
		//return (JSONObject) loader.loadContent();
		return new TextStreamResponse("application/json", loader.loadContent().toString());
	}
}
